import { Module } from '@nestjs/common';
import { SizeService } from 'src/models/size/size.service';
import { AdminController } from './admin.controller';
import { UserService } from 'src/models/user/user.service';
import { ProductService } from 'src/models/product/product.service';
import { DesignationService } from 'src/models/designation/designation.service';
import { BandService } from 'src/models/band/band.service';
import { CategoryService } from 'src/models/category/category.service';
import { ColorService } from 'src/models/color/color.service';
import { CustomerService } from 'src/models/customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user/user.entity';
import { UnitEntity } from 'src/models/unit/unit.entity';
import { UnitService } from 'src/models/unit/unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnitEntity, UserEntity])],
  controllers: [AdminController],
  providers: [UnitService, SizeService, UserService, ProductService, DesignationService, BandService, CategoryService, ColorService, CustomerService],
})
export class AdminModule {}