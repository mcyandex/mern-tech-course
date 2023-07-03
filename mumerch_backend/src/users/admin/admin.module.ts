import { Module } from '@nestjs/common';
import { SizeService } from 'src/models/size/size.service';
import { AdminController } from './admin.controller';
import { ProductService } from 'src/models/product/product.service';
import { DesignationService } from 'src/models/designation/designation.service';
import { BandService } from 'src/models/band/band.service';
import { CategoryService } from 'src/models/category/category.service';
import { ColorService } from 'src/models/color/color.service';
import { CustomerService } from 'src/models/customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from 'src/models/login/login.entity';
import { LoginService } from 'src/models/login/login.service';
import { UserProfileEntity } from 'src/models/userProfile/userProfile.entity';
import { SizeEntity } from 'src/models/size/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ LoginEntity, UserProfileEntity, SizeEntity ])],
  controllers: [ AdminController ],
  providers: [ SizeService, LoginService, ProductService, DesignationService, BandService, CategoryService, ColorService, CustomerService ],
})
export class AdminModule {}