import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class DepartmentDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"Enter a proper name"})
    name: string;

    id: string;

    @IsNotEmpty({message:"Updater name must have a value"})
    @IsString({message:"Updater name must have a string"})
    @Matches(/^[A-Z][a-zA-Z]+$/, {message:"Enter a proper Updater name"})
    updatedBy: string;
}

export class DepartmentRegistrationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"Enter a proper name"})
    name: string;

    @IsNotEmpty({message:"Updater name must have a value"})
    @IsString({message:"Updater name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"Enter a proper Updater name"})
    updatedBy: string;
}