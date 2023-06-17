import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class AdminDTO{
    @IsNotEmpty({message:"This filed is required"})
    @Matches(/^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;

    id: number;

    isActive: boolean;

    updatedBy: string;
}