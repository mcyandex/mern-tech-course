import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { BandManagerDTO } from "../bandManager/bandManager.dto";
import { LoginEntity } from "../login/login.entity";
import { BandManagerEntity } from "../bandManager/bandManager.entity";

export class BandDTO {
  id: string;
  @IsNotEmpty({ message: "Name must have a value" })
  @IsString({ message: "Name must have a string" })
  @Matches(/^[A-Z][a-zA-Z ]+$/, { message: "Enter a proper name" })
  name: string;
  image: string;
  login: LoginEntity
}