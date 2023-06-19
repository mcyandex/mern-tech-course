import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class OrderDTO{
    id: string;
    name: string;
    price: number;
    orderQuantity: number;
    date: string;
    customerId: number;
    updatedBy: string;
   
}