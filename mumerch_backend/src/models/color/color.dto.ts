import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";


export class ColorDTO{
    name: string;

    id: string;


    login:LoginDTO
}