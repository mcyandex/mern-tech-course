import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { OrderProductsMapEntity } from "../orderProductsMap/orderProductsMap.entity";
import { GigEntity } from "../gig/gig.entity";

export class OrderDTO{
    id: string;
    name: string;
    date: string;
    login:LoginDTO
    gig: GigEntity 
    orderProducts: OrderProductsMapEntity[]
    
}