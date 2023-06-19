import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";


export class ColorDTO{
    name: string;

    id: string;

    updatedBy: string;

    updatedAt: string;
}