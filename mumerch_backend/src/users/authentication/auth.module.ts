import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginEntity } from "src/models/login/login.entity";
import { LoginService } from "src/models/login/login.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([LoginEntity])],
  controllers: [AuthController],
  providers: [LoginService, AuthService],
})
export class AuthModule { }