// import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
// import { OrderDTO } from "src/models/order/order.dto";
// import { OrderService } from "src/models/order/order.service";


// @Controller('employee')
// export class EmployeeController {
//   constructor(private readonly orderService: OrderService
//     ) { }


  //UserProfile(loging,UserProfile)
  //ChangePassword(login)
  //ForgetPassword(Login+Token)

  //!!---Product Management---!!
  //Product(color,size,product,band,category)-------->view

  //!!---Gig Management---!!
  //Gig--------------------> view in poster format

  //!!---Order Management---!!
  //1.Order(Customer,login, ProductOrderMap)
  //2.Generate Invoice

  //!!---Reports(Performance)---!!
  //1.Sales Report ---------------------------------------- generate a PDF of total sales for loginId type = emp.. 
  //2.Monthly Revenue Report ------------------------- list of products sold in specific month for loginId type = emp.. 
  //3.Bar Charts ------------------------------------------- sales by 12 months for loginId type = emp.. 



//   //Order CRUD part
//   @Get('getorder')
//   getSize(): OrderDTO {
//     return this.orderService.getOrder();
//   }

//   @Get('getorder/:name')
//   getOrderByName(@Param() name: string): OrderDTO {
//     return this.orderService.getOrderByName(name);
//   }

//   @Post('addorder')
//   addOrder(@Body() data: OrderDTO): string {
//     return this.orderService.addOrder(data);
//   }

//   @Get('deleteorder/:id')
//   deleteOrder(@Param() id: string): string {
//     return this.orderService.deleteOrder(id);
//   }

//   @Put('updateorder')
//   updateOrder(@Body() data: OrderDTO): string {
//     return this.orderService.updateOrder(data);
//   }
// }