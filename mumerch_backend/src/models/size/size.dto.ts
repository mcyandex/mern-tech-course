import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";

export class SizeDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z]+$/, {message:"Enter a proper name"})
    name: string;

    id: string;
    login:LoginDTO
}

export class SizeRegistrationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"Enter a proper name"})
    name: string;
    login:LoginDTO
}