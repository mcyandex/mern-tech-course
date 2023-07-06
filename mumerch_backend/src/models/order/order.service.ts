// import { Injectable } from '@nestjs/common';
// import { OrderDTO } from './order.dto';
// import { Console } from 'console';

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "../product/product.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { OrderDTO } from "./order.dto";

// @Injectable()
// export class OrderService {

//   getOrder(): OrderDTO {
//     return {id:"1",price:1200,name:"abc",orderQuantity:50,date:"2023-6-20",customerId:1, updatedBy:"nayeema"};
//   }

//   getOrderByName(name: string): OrderDTO{
//     console.log(name)
//     return {id:"1",price:1200,name:"abc",orderQuantity:50,date:"2023-6-20",customerId:1, updatedBy:"nayeema"};
//   }

//   updateOrder(data: OrderDTO): string{
//     return data.name;
//   }

//   deleteOrder(id: string): string{
//     console.log(id)
//     return "-- deleted";
//   }

//   addOrder(data: OrderDTO): string{
//     return data.name;
//   }
// }

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
  ) { }

  async getOrderWithUserInfo(): Promise<OrderEntity[]> {
    return await this.orderRepo.find({ relations: ['user'] });
  }
  async getOrder(): Promise<OrderDTO[]> {
    return await this.orderRepo.find();
  }
  async getOrderByName(name: string): Promise<OrderDTO[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.orderRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }

  getAllOrderByUserId(id:string):Promise<OrderEntity>{
    return this.orderRepo.findOne({
      where: {
        login: { id: id },
      },
      relations: {
        login: true,
    }
    });
  }
  async updateOrder(id: string, data: OrderDTO): Promise<OrderDTO> {
    await this.orderRepo.update(id, data)
    return await this.orderRepo.findOneBy({ id: id })
  }
  deleteOrder(id: string): Promise<DeleteResult> {
    return this.orderRepo.delete(id);
  }
  addOrder(data: OrderDTO): Promise<OrderDTO> {
    return this.orderRepo.save(data);
  }
}