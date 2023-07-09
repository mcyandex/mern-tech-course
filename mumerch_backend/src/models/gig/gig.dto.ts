import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { OrderDTO } from "../order/order.dto";
import { GigManagerEntity } from "../gigManager/gigManager.entity";
import { LoginEntity } from "../login/login.entity";
import { OrderEntity } from "../order/order.entity";

export class GigDTO{
    id:string
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name:string

    @IsDateString()
    @IsNotEmpty({message:"Start date is required"})
    startDate: string

    @IsNotEmpty({message:"End date is required"})
    @IsDateString()
    endDate: string

    login:LoginEntity
    gigManager:GigManagerEntity
    orders:OrderEntity[]
}

export class GigResgistrationDTO{
    
}