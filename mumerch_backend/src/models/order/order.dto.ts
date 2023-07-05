import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";

export class OrderDTO{
    id: string;
    name: string;
    login:LoginDTO
    // price: number;
    // orderQuantity: number;
    // date: string;
    // customerId: number;
    // updatedBy: string;
   
}