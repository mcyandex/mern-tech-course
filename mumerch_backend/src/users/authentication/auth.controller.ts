import { Post, Body, Controller, ValidationPipe, UsePipes, Get, UseGuards, BadRequestException, ForbiddenException, Session, UnauthorizedException, NotFoundException } from "@nestjs/common"
import { Login } from "src/models/login/login.dto"
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
}