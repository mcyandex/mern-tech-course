import { Injectable } from '@nestjs/common';
import { OrderDTO } from './order.dto';
import { Console } from 'console';

@Injectable()
export class OrderService {

  getOrder(): OrderDTO {
    return {id:"1",price:1200,name:"abc",orderQuantity:50,date:"2023-6-20",customerId:1, updatedBy:"nayeema"};
  }

  getOrderByName(name: string): OrderDTO{
    console.log(name)
    return {id:"1",price:1200,name:"abc",orderQuantity:50,date:"2023-6-20",customerId:1, updatedBy:"nayeema"};
  }

  updateOrder(data: OrderDTO): string{
    return data.name;
  }

  deleteOrder(id: string): string{
    console.log(id)
    return "-- deleted";
  }

  addOrder(data: OrderDTO): string{
    return data.name;
  }
}