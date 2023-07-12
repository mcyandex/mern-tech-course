import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginEntity } from "src/models/login/login.entity";
import { LoginService } from "src/models/login/login.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TokenEntity } from "src/models/token/token.entity";
import { TokenService } from "src/models/token/token.service";

@Module({
  imports: [TypeOrmModule.forFeature([LoginEntity, TokenEntity])],
  controllers: [AuthController],
  providers: [LoginService, AuthService, TokenService],
})
export class AuthModule { }