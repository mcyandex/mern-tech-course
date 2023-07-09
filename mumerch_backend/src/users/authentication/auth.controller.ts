import { Post, Body, Controller, ValidationPipe, UsePipes, Get, UseGuards, BadRequestException, ForbiddenException, Session, UnauthorizedException, NotFoundException } from "@nestjs/common"
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
  async login(@Body() data: Login, @Session() session): Promise<any> {
    const user = await this.loginService.getUserLoginInfoById(data.id)
    if(user!=null){
      const res = await this.loginService.login(data.password, user.password)
      if(res){
        session.user=user
        return true
      }
      return new NotFoundException({message:"User Id or Password didnot match"})
    }
    return new UnauthorizedException({message:"User not found"})
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
      console.log(session.user.password, data.password, session)
      const res: boolean = await bcrypt.compare(data.oldPassword, session.user.password)
      if (res) {
        const newData = new LoginEntity()
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(data.password, salt);
        newData.password = hassedpassed
        return await this.loginService.updateUserLoginInfo(session.user.id, newData)
      }
      return new ForbiddenException({ message: "User not identified" })
    }
    return new BadRequestException({ message: "Re-typed password didnot match" })
  }
}