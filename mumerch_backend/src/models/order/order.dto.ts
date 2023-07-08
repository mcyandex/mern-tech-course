import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { ProductOrderMapDTO } from "../productOrderMap/productOrderMap.dto";

export class OrderDTO{
    id: string;
    name: string;
    orderPrice: number;
    orderQuantity: number;
    date: string;
    login:LoginDTO
    productOrderMaps:ProductOrderMapDTO[]  
}