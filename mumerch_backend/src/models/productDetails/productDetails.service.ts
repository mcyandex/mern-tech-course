import { Injectable } from "@nestjs/common";
import { ProductDetailsEntity } from "./productDetails.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectRepository(ProductDetailsEntity) private productDetailsRepo: Repository<ProductDetailsEntity>,
  ) { }
  getProductDetails(): Promise<ProductDetailsEntity[]> {
    return this.productDetailsRepo.find();
  }
  getProductDetailsWithProductInfo(): Promise<ProductDetailsEntity[]> {
    return this.productDetailsRepo.find({
      relations:{
        product:true,
        size:true,
        color:true
      }
    });
  }
  async getProductDetailsByName(name: string): Promise<ProductDetailsEntity[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.productDetailsRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
      relations:{
        product:true,
        size:true,
        color:true
      }
    })
  }

  async getProductDetailsByNameWithAllOption(name: string): Promise<ProductDetailsEntity[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.productDetailsRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
      relations:{
        product:true,
        size:true,
        color:true
      }
    })
  }

  getProductDetailsById(id:string): Promise<ProductDetailsEntity> {
    return this.productDetailsRepo.findOneBy({id:id});
  }
  async updateProductDetails(id: string, data: ProductDetailsEntity): Promise<ProductDetailsEntity> {
    await this.productDetailsRepo.update(id, data)
    return await this.productDetailsRepo.findOneBy({ id: id })
  }
  deleteProductDetails(id: string): Promise<DeleteResult> {
    return this.productDetailsRepo.delete(id);
  }
  addProductDetails(data: ProductDetailsEntity): Promise<ProductDetailsEntity> {
    return this.productDetailsRepo.save(data);
  }
  getCount():any{
    return this.productDetailsRepo.count()
  }
}