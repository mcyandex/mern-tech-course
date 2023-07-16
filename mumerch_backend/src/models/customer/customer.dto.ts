import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
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

    @IsNotEmpty({message:"Phone name must have a value"})
    @IsString({message:"Phone name must have a string"})
    @Matches(/^01[6-9|3|4]\d{8}$/, {message:"Phone name can contain only letters and numbers"})
    phoneNo: string;
    
    id: string;
    login:LoginDTO
    orders: OrderEntity[]

}