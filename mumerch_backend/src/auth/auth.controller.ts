import { Post, Body, Controller, ValidationPipe, UsePipes, Get, UseGuards, Session, UnauthorizedException, NotFoundException, Param, RequestTimeoutException, Patch } from "@nestjs/common"
import { ForgetPassword, Login } from "src/models/login/login.dto"
import { LoginService } from "src/models/login/login.service"
import { TokenService } from "src/models/token/token.service";
import { TokenEntity } from "src/models/token/token.entity";
import { LoginEntity } from "src/models/login/login.entity";
import { AuthService } from "./auth.service";
import { SessionLoginGuard } from "./loginSession.gaurd";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) { }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: Login, @Session() session): Promise<LoginEntity> {
    const user = await this.loginService.getUserLoginInfoById(data.id)
    if (user != null) {
      const res = await this.loginService.login(data.password, user.password)
      if (res) {
        session.user = user
        return user
      }
      else{
        throw new NotFoundException({ message: "User Id or Password didnot match" })
      }
    }
    else{
      throw new UnauthorizedException({ message: "User is not authorised" })
    }
  }

  @Get('forgetpassword/:id')
  async forgetPassword(@Param('id') id: string): Promise<string> {
    const data = await this.loginService.getUserLoginInfoById(id)
    console.log(id)
    if (data != null) {
      const newToken = new TokenEntity()
      newToken.token = await this.tokenService.generateRandomNumber()
      newToken.startTime = new Date()
      newToken.endTime = new Date(newToken.startTime.getTime() + 10 * 60000)
      newToken.login = data
      const res = await this.tokenService.getTokenByLoginId(id)
      if (res != null) {
        await this.tokenService.updateToken(res.id, newToken)
      }
      else {
        await this.tokenService.addToken(newToken)
      }
      await this.authService.sendForgetPasswordMail(newToken)
      return await this.tokenService.generateMaskedMail(data.email)
    }
    else {
      throw new NotFoundException({ message: "User not found" })
    }
  }
  @Patch('checkforgetpasswordcode')
  @UsePipes(new ValidationPipe())
  async checkForgetPasswordCode(@Body() data: ForgetPassword, id:string): Promise<any> {
    console.log(data)
    const res = await this.tokenService.getTokenByLoginId(id)
    if (res != null) {
      const now = new Date()
      if (res.endTime > now) {
        if (res.token === data.token) {
          const newData = new LoginEntity()
          const newPass = await this.loginService.getHassedPassword(data.password)
          newData.password = newPass
          const newLogin = await this.loginService.updateUserLoginInfo(id, newData)
          const delRes = await this.tokenService.deleteToken(res.id)
          if (newLogin != null && delRes['affected'] > 0) {
            return true
          }
        }
        else {
          throw new UnauthorizedException({ message: "Recovery data not appropiate" })
        }
      }
      else {
        throw new RequestTimeoutException({ message: "Session time-out, please try again" })
      }
    }
    else {
      throw new NotFoundException({ message: "Proper data not found" })
    }
  }

  @Get('logout')
  @UseGuards(SessionLoginGuard)
  logout(@Session() session): boolean {
    //console.log(session.user)
    if (session.user != null) {
      session.destroy()
      return true
    }
  }
}