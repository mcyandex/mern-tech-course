import { IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginEntity } from "../login/login.entity";
export class DesignationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name: string;
    updater:LoginEntity
    id: string;
    login:LoginEntity[]
}