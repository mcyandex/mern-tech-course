import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CategoryDTO{
    name: string;

    id: string;

    updatedAt: Date;
}