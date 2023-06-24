import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitEntity } from './unit.entity';
import { Repository } from 'typeorm';
import { UnitDTO, UnitRegistrationDTO } from './unit.dto';
import { LessThan } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity) private unitRepo: Repository<UnitEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ){}

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

  
  
  async addUnit(data: UnitEntity): Promise<any>{
    return await this.unitRepo.save(data);
  }
}