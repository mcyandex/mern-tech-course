import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
  ) { }
  getProduct(): Promise<ProductEntity[]> {
    return this.productRepo.find();
  }
  async updateProduct(id: string, data: ProductEntity): Promise<ProductEntity> {
    await this.productRepo.update(id, data)
    return await this.productRepo.findOneBy({ id: id })
  }
  deleteProduct(id: string): Promise<DeleteResult> {
    return this.productRepo.delete(id);
  }
  addProduct(data: ProductEntity): Promise<ProductEntity> {
    return this.productRepo.save(data);
  }
}