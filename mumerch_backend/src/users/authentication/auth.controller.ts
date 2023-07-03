import { Post, Body, Controller, Session, ValidationPipe, UsePipes } from "@nestjs/common"
import { Login } from "src/models/login/login.dto"
import { LoginService } from "src/models/login/login.service"

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginService:LoginService
    ){}
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() data:Login, @Session() session):Promise<boolean>{
        const user = await this.loginService.login(data)
        if(user!=null){
            session.user=user
            return true
        }
        return false
    }
}