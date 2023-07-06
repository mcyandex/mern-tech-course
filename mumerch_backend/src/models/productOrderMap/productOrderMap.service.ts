import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ProductOrderMapEntity } from './productOrderMap.entity';


@Injectable()
export class ProductOrderMapService {
  constructor(
    @InjectRepository(ProductOrderMapEntity) private proOrderMapRepo: Repository<ProductOrderMapEntity>,
  ) { }
  getProductOrderMap(): Promise<ProductOrderMapEntity[]> {
    return this.proOrderMapRepo.find();
  }
  async updateProductOrderMap(id: string, data: ProductOrderMapEntity): Promise<ProductOrderMapEntity> {
    await this.proOrderMapRepo.update(id, data)
    return await this.proOrderMapRepo.findOneBy({ id: id })
  }
  deleteProductOrderMap(id: string): Promise<DeleteResult> {
    return this.proOrderMapRepo.delete(id);
  }
  addProductOrderMap(data: ProductOrderMapEntity): Promise<ProductOrderMapEntity> {
    return this.proOrderMapRepo.save(data);
  }
}