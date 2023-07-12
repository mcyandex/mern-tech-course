import { IsNotEmpty } from "class-validator";
import { ColorEntity } from "../color/color.entity";
import { SizeEntity } from "../size/size.entity";
import { ProductEntity } from "../product/product.entity";
import { OrderProductsMapEntity } from "../orderProductsMap/orderProductsMap.entity";

export class ProductDetailsDTO{
  id: string;
  name:string
  quantity:number
  color:ColorEntity
  size:SizeEntity
  product:ProductEntity
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
  