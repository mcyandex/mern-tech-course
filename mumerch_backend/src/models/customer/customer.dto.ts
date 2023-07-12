import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { OrderEntity } from "../order/order.entity";

export class CustomerDTO{
    @IsNotEmpty({message:"This filed is required"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;
    @IsEmail({}, {message:"invalid email"})
    @IsNotEmpty({message:"This filed is required"})
    email: string;
    phoneNo: string;
    id: string;
    login:LoginDTO
    orders: OrderEntity[]

}