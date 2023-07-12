import { LoginEntity } from "../login/login.entity";
import { OrderProductsMapEntity } from "../orderProductsMap/orderProductsMap.entity";
import { CategoryEntity } from "../category/category.entity";
import { BandEntity } from "../band/band.entity";
import { ProductDetailsEntity } from "../productDetails/productDetails.entity";
import { ProductRegistrationDetailsDTO } from "../productDetails/productDetails.dto";

export class ProductDTO {
  id: string;
  name:string
  price:number
  image:string
  revenuePercentage:number
  login:LoginEntity
  category:CategoryEntity
  band:BandEntity
  productDetails:ProductDetailsEntity[]
}
export class ProductRegistrationDTO {
  id: string;
  name:string
  price:number
  image:string
  revenuePercentage:number
  login:LoginEntity
  category:CategoryEntity
  band:BandEntity
  productDetails:ProductRegistrationDetailsDTO[]
}