import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { OrderService } from 'src/models/order/order.service';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [OrderService],
})
export class EmployeeModule {}