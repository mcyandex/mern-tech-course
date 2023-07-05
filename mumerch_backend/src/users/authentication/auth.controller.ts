import { Post, Body, Controller, ValidationPipe, UsePipes, Get, UseGuards, BadRequestException, ForbiddenException, Session } from "@nestjs/common"
import { Login, ResetPassword } from "src/models/login/login.dto"
import { LoginService } from "src/models/login/login.service"
import { SessionLoginGuard } from "./sessionLogin.gaurd"
import * as bcrypt from 'bcrypt';
import { LoginEntity } from "src/models/login/login.entity"

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService
  ) { }
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: Login, @Session() session): Promise<boolean> {
    const user = await this.loginService.login(data)
    if (user != null) {
      session.user = user
      return true
    }
    return false
  }
  @Get('logout')
  @UseGuards(SessionLoginGuard)
  logout(@Session() session): boolean {
    console.log(session.user)
    if (session.user != null) {
      session.destroy()
      console.log(session.user)
      return true
    }
  }
  @Post('resetpassword')
  @UseGuards(SessionLoginGuard)
  async resetPassword(@Body() data: ResetPassword, @Session() session) {
    if (data.password == data.reTypePassword) {
      const res: boolean = await bcrypt.compare(session.user.id, data.oldPassword)
      if (res) {
        //console.log(data)
        const newData = new LoginEntity()
        newData.password = data.password
        return await this.loginService.updateUserLoginInfo(newData, session.user.id)
      }
      return new ForbiddenException({ message: "User not identified" })
    }
    return new BadRequestException({ message: "Re-typed password didnot match" })
  }
}