import { Module } from '@nestjs/common';
import { UnitService } from 'src/models/unit/unit.service';
import { SizeService } from 'src/models/size/size.service';
import { AdminController } from './admin.controller';
import { UserService } from 'src/models/user/user.service';
import { ProductService } from 'src/models/product/product.service';
import { DepartmentService } from 'src/models/department/department.service';
import { DivisionService } from 'src/models/division/division.service';
import { DesignationService } from 'src/models/designation/designation.service';
import { EmployeeService } from 'src/models/employee/employee.service';
import { BandService } from 'src/models/band/band.service';
import { CategoryService } from 'src/models/category/category.service';
import { ColorService } from 'src/models/color/color.service';
import { CustomerService } from 'src/models/customer/customer.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [UnitService, SizeService, UserService, ProductService, DepartmentService, DivisionService, DesignationService, EmployeeService, BandService, CategoryService, ColorService, CustomerService],
})
export class AdminModule {}