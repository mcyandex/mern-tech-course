import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from './unit/unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitEntity])
  ],
  controllers: [],
  providers: [],
})
export class GeneralDBModule {}