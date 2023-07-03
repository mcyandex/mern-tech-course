// import { Injectable } from '@nestjs/common';
// import { Console } from 'console';
// import { ProductDTO } from './product.dto';

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { ColorEntity } from "../color/color.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { ProductDTO } from "./product.dto";

// @Injectable()
// export class ProductService {
//   getProduct(): ProductDTO {
//     return {id:100,name:"Tshirt",updatedBy:"elahi",image:"aaa",quantity:50,sellingPrice:1500,revenuePercentage:30};
//   }

//   getProductByName(name: string): ProductDTO{
//     console.log(name)
//     return {id:100,name:"Tshirt",updatedBy:"elahi",image:"aaa",quantity:50,sellingPrice:1500,revenuePercentage:30};
//   }

//   updateProduct(data: ProductDTO): string{
//     return data.name;
//   }

//   deleteProduct(id: number): string{
//     console.log(id)
//     return "-- deleted";
//   }

//   addProduct(data: ProductDTO): string{
//     return data.name;
//   }
// }

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
  ) { }

  async getProductWithUserInfo(): Promise<ProductEntity[]> {
    return await this.productRepo.find({ relations: ['user'] });
  }
  async getProduct(): Promise<ProductDTO[]> {
    return await this.productRepo.find();
  }
  async getProductByName(name: string): Promise<ProductDTO[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.productRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }
  async updateProduct(id: string, data: ProductDTO): Promise<ProductDTO> {
    await this.productRepo.update(id, data)
    return await this.productRepo.findOneBy({ id: id })
  }
  deleteProduct(id: string): Promise<DeleteResult> {
    return this.productRepo.delete(id);
  }
  addProduct(data: ProductDTO): Promise<ProductDTO> {
    return this.productRepo.save(data);
  }
}