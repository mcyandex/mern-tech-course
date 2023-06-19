import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class ProductDTO{
    name: string;
    id: number;
    updatedBy: string;
    image: string;
    quantity: number;
    sellingPrice: number;
    revenuePercentage: number;
}