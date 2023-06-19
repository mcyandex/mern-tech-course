import { Module } from '@nestjs/common';
import { UnitService } from 'src/models/unit/unit.service';
import { SizeService } from 'src/models/size/size.service';
import { AdminController } from './admin.controller';
import { UserService } from 'src/models/user/user.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [UnitService, SizeService, UserService],
})
export class AdminModule {}