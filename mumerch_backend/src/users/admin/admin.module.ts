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
import { UserProfileService } from 'src/models/userProfile/userProfile.service';
import { ColorEntity } from 'src/models/color/color.entity';
import { ProductEntity } from 'src/models/product/product.entity';
import { OrderEntity } from 'src/models/order/order.entity';
import { OrderService } from 'src/models/order/order.service';
import { AuthService } from '../authentication/auth.service';
import { BandEntity } from 'src/models/band/band.entity';
import { BandManagerEntity } from 'src/models/bandManager/bandManager.entity';
import { BandManagerService } from 'src/models/bandManager/bandManager.service';
import { CategoryEntity } from 'src/models/category/category.entity';
import { DesignationEntity } from 'src/models/designation/designation.entity';
import { CustomerEntity } from 'src/models/customer/customer.entity';
import { ProductColorMapEntity } from 'src/models/productColorMap/productColorMap.entity';
import { ProductSizeMapEntity } from 'src/models/productSizeMap/productSizeMap.entity';
import { GigEntity } from 'src/models/gig/gig.entity';
import { GigManagerEntity } from 'src/models/gigManager/gigManager.entity';
import { OrderProductsMapEntity } from 'src/models/orderProductsMap/orderProductsMap.entity';
import { ProductColorMapService } from 'src/models/productColorMap/productColorMap.service';
import { ProductSizeMapService } from 'src/models/productSizeMap/productSizeMap.service';
import { GigService } from 'src/models/gig/gig.service';

@Module({
  imports: [TypeOrmModule.forFeature([ LoginEntity, UserProfileEntity, SizeEntity, ColorEntity, ProductEntity, DesignationEntity,CustomerEntity, ProductColorMapEntity, ProductSizeMapEntity, OrderProductsMapEntity, BandEntity, BandManagerEntity, CategoryEntity, OrderEntity, GigEntity, GigManagerEntity ])],
  controllers: [ AdminController ],
  providers: [ UserProfileService, SizeService, LoginService, ProductService, DesignationService, BandService, CategoryService, ColorService, CustomerService, AuthService, OrderService, BandManagerService, ProductColorMapService, ProductSizeMapService, GigService ],
})
export class AdminModule {}