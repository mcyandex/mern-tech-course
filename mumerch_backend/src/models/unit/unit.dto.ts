import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { UserDTO } from "../user/user.dto";
import { UserEntity } from "../user/user.entity";
import { UnitEntity } from "./unit.entity";

export class UnitDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name: string;
    id: string;
    user:UserDTO
}
export class UnitRegistrationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name: string;
    user:UserDTO;
}