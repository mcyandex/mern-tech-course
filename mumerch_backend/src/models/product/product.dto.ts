import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";

export class ProductDTO{
    name: string;
    id: string;
    login:LoginDTO
    // updatedBy: string;
    // image: string;
    // quantity: number;
    // sellingPrice: number;
    // revenuePercentage: number;
}