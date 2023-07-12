import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { OrderProductsMapEntity } from './orderProductsMap.entity';


@Injectable()
export class OrderProductsMapService {
  constructor(
    @InjectRepository(OrderProductsMapEntity) private orderProductsRepo: Repository<OrderProductsMapEntity>,
  ) { }
  getOrderProductsMap(): Promise<OrderProductsMapEntity[]> {
    return this.orderProductsRepo.find();
  }
  async updateOrderProductsMap(id: string, data: OrderProductsMapEntity): Promise<OrderProductsMapEntity> {
    await this.orderProductsRepo.update(id, data)
    return await this.orderProductsRepo.findOneBy({ id: id })
  }
  deleteOrderProductsMap(id: string): Promise<DeleteResult> {
    return this.orderProductsRepo.delete(id);
  }
  addOrderProductsMap(data: OrderProductsMapEntity): Promise<OrderProductsMapEntity> {
    return this.orderProductsRepo.save(data);
  }
  getOrderProductsMapWithReport():any{
    return this.orderProductsRepo.find({
      relations:{
        order:{
          gig:true
        },
        productDetails:{
          size:true,
          color:true,
          product:{
            band:true
          }
        }
      }
    });
  }
}