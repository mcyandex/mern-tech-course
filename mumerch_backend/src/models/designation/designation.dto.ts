import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
export class DesignationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"Enter a proper name"})
    name: string;

    id: string;
    login:LoginDTO
}

export class DesignationRegistrationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"Enter a proper name"})
    name: string;

    @IsNotEmpty({message:"Updater name must have a value"})
    @IsString({message:"Updater name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"Enter a proper Updater name"})
    updatedBy: string;
}