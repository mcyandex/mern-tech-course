import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { OrderProductsMapEntity } from "../orderProductsMap/orderProductsMap.entity";
import { GigEntity } from "../gig/gig.entity";
import { LoginEntity } from "../login/login.entity";
import { CustomerEntity } from "../customer/customer.entity";

export class OrderDTO {
  id: string
  date: Date
  login: LoginEntity
  @IsNotEmpty({message:"Must need list of products details"})
  orderProducts: OrderProductsMapEntity[]
  @IsNotEmpty({message:"Must provide the Event Id"})
  gig: GigEntity
  @IsNotEmpty({message:"Must provide user information"})
  customer: CustomerEntity
}