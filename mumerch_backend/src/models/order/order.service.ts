import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { OrderDTO } from "./order.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
  ) { }

  getOrderWithUserInfo(): Promise<OrderEntity[]> {
    return this.orderRepo.find({ relations: ['user'] });
  }
  getOrder(): Promise<OrderEntity[]> {
    return this.orderRepo.find();
  }
  getOrderById(id:string):Promise<OrderEntity>{
    return this.orderRepo.findOne({
      where:{
        id:id
      },
      relations:{
        orderProducts:{
          productDetails:true
        },
        customer:true
      }
    })
  }
  getOrderWithOrderProductsMap(): Promise<OrderEntity[]> {
    return this.orderRepo.find({
      relations:{
        orderProducts:{
          order:true,
          productDetails:true
        },
        customer:true
      }
    });
  }
  getOrderByGigId(GigId:string): Promise<OrderEntity> {
    return this.orderRepo.findOne({
      where:{
        gig:{id: GigId
      }},
      relations:{
        gig: true,
      }
    });
  }
  getOrderByBandId(bandId:string): Promise<OrderEntity> {
    return this.orderRepo.findOne({
      where:{
        orderProducts:{
          productDetails:{
            product:{
              band:{
                id:bandId
              }
            }
          }
      }}, 
      relations:{
        orderProducts:{
          productDetails:{
            product:{
              band:true
              
            }
          }
      }
    }});
  }

  async updateOrder(id: string, data: OrderDTO): Promise<OrderEntity> {
    await this.orderRepo.update(id, data)
    return await this.orderRepo.findOneBy({ id: id })
  }
  deleteOrder(id: string): Promise<DeleteResult> {
    return this.orderRepo.delete(id);
  }
  addOrder(data: OrderDTO): Promise<OrderEntity> {
    return this.orderRepo.save(data);
  }
}