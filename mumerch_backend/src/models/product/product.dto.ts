import { LoginEntity } from "../login/login.entity";
import { CategoryEntity } from "../category/category.entity";
import { BandEntity } from "../band/band.entity";
import { ProductDetailsEntity } from "../productDetails/productDetails.entity";
import { ProductRegistrationDetailsDTO } from "../productDetails/productDetails.dto";

export class ProductDTO {
  id: string;
  name:string
  price:number
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
  revenuePercentage:number
  login:LoginEntity
  category:CategoryEntity
  band:BandEntity
  productDetails:ProductDetailsEntity
}