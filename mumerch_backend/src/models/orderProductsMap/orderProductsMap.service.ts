import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { OrderProductsMapEntity } from './orderProductsMap.entity';


@Injectable()
export class OrderProductsMapService {
  constructor(
    @InjectRepository(OrderProductsMapEntity) private proOrderMapRepo: Repository<OrderProductsMapEntity>,
  ) { }
  getProductOrderMap(): Promise<OrderProductsMapEntity[]> {
    return this.proOrderMapRepo.find();
  }
  async updateProductOrderMap(id: string, data: OrderProductsMapEntity): Promise<OrderProductsMapEntity> {
    await this.proOrderMapRepo.update(id, data)
    return await this.proOrderMapRepo.findOneBy({ id: id })
  }
  deleteProductOrderMap(id: string): Promise<DeleteResult> {
    return this.proOrderMapRepo.delete(id);
  }
  addProductOrderMap(data: OrderProductsMapEntity): Promise<OrderProductsMapEntity> {
    return this.proOrderMapRepo.save(data);
  }
}