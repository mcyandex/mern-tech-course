import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ProductColorMapEntity } from './productColorMap.entity';


@Injectable()
export class ProductColorMapService {
  constructor(
    @InjectRepository(ProductColorMapEntity) private proColorMapRepo: Repository<ProductColorMapEntity>,
  ) { }
  getProductColorMap(): Promise<ProductColorMapEntity[]> {
    return this.proColorMapRepo.find();
  }
  async updateProductColorMap(id: string, data: ProductColorMapEntity): Promise<ProductColorMapEntity> {
    await this.proColorMapRepo.update(id, data)
    return await this.proColorMapRepo.findOneBy({ id: id })
  }
  deleteProductColorMap(id: string): Promise<DeleteResult> {
    return this.proColorMapRepo.delete(id);
  }
  addProductColorMap(data: ProductColorMapEntity): Promise<ProductColorMapEntity> {
    return this.proColorMapRepo.save(data);
  }
}