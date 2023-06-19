import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrderDTO } from "src/models/order/order.dto";
import { OrderService } from "src/models/order/order.service";


@Controller('employee')
export class EmployeeController {
  constructor(private readonly orderService: OrderService
    ) { }

  //Order CRUD part
  @Get('getorder')
  getSize(): OrderDTO {
    return this.orderService.getOrder();
  }

  @Get('getorder/:name')
  getOrderByName(@Param() name: string): OrderDTO {
    return this.orderService.getOrderByName(name);
  }

  @Post('addorder')
  addOrder(@Body() data: OrderDTO): string {
    return this.orderService.addOrder(data);
  }

  @Get('deleteorder/:id')
  deleteOrder(@Param() id: string): string {
    return this.orderService.deleteOrder(id);
  }

  @Put('updateorder')
  updateOrder(@Body() data: OrderDTO): string {
    return this.orderService.updateOrder(data);
  }
}