import { IsNotEmpty, IsNumber, IsPositive, IsString, Matches } from "class-validator";
import { ColorEntity } from "../color/color.entity";
import { SizeEntity } from "../size/size.entity";
import { ProductEntity } from "../product/product.entity";
import { OrderProductsMapEntity } from "../orderProductsMap/orderProductsMap.entity";

export class ProductDetailsDTO{
  id: string;
  @IsNotEmpty({message:"Name must have a value"})
  @IsString({message:"Name must have a string"})
  @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
  name:string
  @IsNumber({},{message:"Quantity must be a number"})
  quantity:number
  @IsNotEmpty({ message: "Color code must have a value" })
  color:ColorEntity
  @IsNotEmpty({ message: "Size must have a value" })
  size:SizeEntity
  @IsNotEmpty({ message: "Product must have a value" })
  @IsPositive({})
  product:ProductEntity
  @IsNotEmpty({ message: "Must have a value" })
  orderProducts:OrderProductsMapEntity[]
}
export class ProductRegistrationDetailsDTO{
  id: string;
  name:string
  quantity:number
  colorId:string
  sizeId:string
  product:ProductEntity
}
  