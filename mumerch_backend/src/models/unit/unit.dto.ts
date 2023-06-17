import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class UnitDTO{
    @IsNotEmpty({message:"This filed is required"})
    @Matches(/^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;

    id: number;

    updatedBy: string;
}