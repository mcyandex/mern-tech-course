import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ProductSizeMapEntity } from './productSizeMap.entity';


@Injectable()
export class ProductSizeMapService {
  constructor(
    @InjectRepository(ProductSizeMapEntity) private proSizeMapRepo: Repository<ProductSizeMapEntity>,
  ) { }
  getProductSizeMap(): Promise<ProductSizeMapEntity[]> {
    return this.proSizeMapRepo.find();
  }
  async updateProductSizeMap(id: string, data: ProductSizeMapEntity): Promise<ProductSizeMapEntity> {
    await this.proSizeMapRepo.update(id, data)
    return await this.proSizeMapRepo.findOneBy({ id: id })
  }
  deleteProductSizeMap(id: string): Promise<DeleteResult> {
    return this.proSizeMapRepo.delete(id);
  }
  addProductSizeMap(data: ProductSizeMapEntity): Promise<ProductSizeMapEntity> {
    return this.proSizeMapRepo.save(data);
  }
}