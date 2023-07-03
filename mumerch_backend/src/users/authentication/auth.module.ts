import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginEntity } from "src/models/login/login.entity";
import { LoginService } from "src/models/login/login.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ LoginEntity ])],
    controllers: [ AuthController ],
    providers: [ LoginService ],
  })
  export class AuthModule {}