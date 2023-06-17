import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class SizeDTO{
    name: string;

    id: number;

    updatedBy: string;
}