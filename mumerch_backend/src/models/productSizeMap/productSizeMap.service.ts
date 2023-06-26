import { Injectable } from "@nestjs/common";
import { ProductSizeMapDTO } from "./productSizeMap.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductSizeMapEntity } from "./productSizeMap.entity";
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


  constructor(
    @InjectRepository(ProductSizeMapEntity) private productSizeMapRepo: Repository<ProductSizeMapEntity>,
  ) {}

  async getProductSizeMapWithSizeInfo(): Promise<ProductSizeMapEntity[]> {
    return await this.productSizeMapRepo.find({ relations: ['size'] });
  }


  async getProductSizeMapWithProductInfo(): Promise<ProductSizeMapEntity[]> {
    return await this.productSizeMapRepo.find({ relations: ['product'] });
  }


  async deleteProductSizeMap(id: string): Promise<DeleteResult> {
    return await this.productSizeMapRepo.delete(id);
  }





}