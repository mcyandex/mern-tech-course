import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { LoginEntity } from "../login/login.entity";

export class TokenDTO{
  id: string;
  @IsDateString({},{message:"Date must be a string"})
  startTime: Date
  @IsDateString({},{message:"Date must be a string"})
  endTime: Date
  @IsNotEmpty({ message: "Must have a value" })
  @IsString({message:"Token must be a string"})
  token:string
  login: LoginEntity
}