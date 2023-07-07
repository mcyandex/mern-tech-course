import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";


export class ColorDTO{
    
    @IsNotEmpty({message:"Color must have a value"})
    @IsString({message:"Color must have a string"})
    @Matches(/^[A-Z][a-zA-Z]+$/, {message:"Enter a proper color name"})
    name: string;

    id: string;
    colorCode: string;
    login:LoginDTO
}

export class ColorRegistrationDTO{
    @IsNotEmpty({message:"Color must have a value"})
    @IsString({message:"Color must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"Enter a proper color name"})
    name: string;
    
    login:LoginDTO
}