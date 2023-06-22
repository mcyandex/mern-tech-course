import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitEntity } from './unit.entity';
import { Repository } from 'typeorm';
import { UnitDTO } from './unit.dto';
import { LessThan } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private unitRepo: Repository<UnitEntity>){}

  // getUnit(): UnitDTO {
  //   return {id:"100",name:"M",updatedBy:"elahi"};
  // }

  // getUnitByName(name: string): UnitDTO{
  //   return {id:"100",name:"XL",updatedBy:"elahi"};
  // }

  // updateUnit(data: UnitDTO): string{
  //   return data.name;
  // }

  // deleteUnit(id: string): string{
  //   return "Unit ---- deleted";
  // }

  
  
  async addUnit(data: UnitDTO): Promise<UnitEntity>{
    return this.unitRepo.save(data);
  }
}