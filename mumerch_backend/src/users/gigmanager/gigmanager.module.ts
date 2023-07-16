import { Module } from '@nestjs/common';
import { GigManagerController } from './gigmanager.controller';
import { UserProfileService } from 'src/models/userProfile/userProfile.service';
import { UserProfileEntity } from 'src/models/userProfile/userProfile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginService } from 'src/models/login/login.service';
import { LoginEntity } from 'src/models/login/login.entity';
import { GigService } from 'src/models/gig/gig.service';
import { GigEntity } from 'src/models/gig/gig.entity';
import { GigManagerEntity } from 'src/models/gigManager/gigManager.entity';
import { GigManagerService } from 'src/models/gigManager/gigManager.service';
import { BandEntity } from 'src/models/band/band.entity';
import { BandService } from 'src/models/band/band.service';
import { OrderService } from 'src/models/order/order.service';
import { OrderEntity } from 'src/models/order/order.entity';
import { CustomerEntity } from 'src/models/customer/customer.entity';
import { CustomerService } from 'src/models/customer/customer.service';
import { OrderProductsMapService } from 'src/models/orderProductsMap/orderProductsMap.service';
import { OrderProductsMapEntity } from 'src/models/orderProductsMap/orderProductsMap.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ UserProfileEntity, LoginEntity, GigEntity, GigManagerEntity, BandEntity, OrderEntity, CustomerEntity, OrderProductsMapEntity ])],
  controllers: [GigManagerController],
  providers: [UserProfileService, LoginService, GigService, GigManagerService, BandService, OrderService, CustomerService, OrderProductsMapService],
})
export class GigManagerModule {}