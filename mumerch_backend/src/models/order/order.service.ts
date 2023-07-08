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