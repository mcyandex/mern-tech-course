import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { BandDTO } from "../band/band.dto";
import { CategoryDTO } from "../category/category.dto";
import { LoginEntity } from "../login/login.entity";
import { ProductSizeMapEntity } from "../productSizeMap/productSizeMap.entity";
import { ProductColorMapEntity } from "../productColorMap/productColorMap.entity";
import { OrderProductsMapEntity } from "../orderProductsMap/orderProductsMap.entity";

export class ProductDTO {
  id: string;
  name: string
  price: number
  image: string
  revenuePercentage: number
  quantity: number
  login: LoginEntity
  productSizeMaps: ProductSizeMapEntity[]
  productColorMaps: ProductColorMapEntity[]
  orderProductsMap: OrderProductsMapEntity[]
  band:BandDTO
  category:CategoryDTO
}