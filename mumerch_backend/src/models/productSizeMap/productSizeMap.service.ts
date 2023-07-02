import { Injectable } from "@nestjs/common";
import { ProductSizeMapDTO } from "./productSizeMap.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ProductSizeMapService {
  // getProductSizeMap(): ProductSizeMapDTO {
  //   return {id:"10",productId:"p-100",sizeId:"s-100"};
  // }

  // getProductSizeMapById(id: string): ProductSizeMapDTO{
  //   return {id:"10",productId:"p-100",sizeId:"s-100"};
  // }

  // updateProductSizeMap(data: ProductSizeMapDTO): string{
  //   return data.productId+" "+data.sizeId;
  // }

  // deleteProductSizeMap(id: string): string{
  //   return "-- deleted";
  // }

  // addProductSizeMap(data: ProductSizeMapDTO): string{
  //   return data.productId+" "+data.sizeId;
  // }
}