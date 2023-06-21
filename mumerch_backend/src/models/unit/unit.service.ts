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

  

  async findLastId(): Promise<string> {
    try {
      const entity = await this.unitRepo.find({
        select: ["id"],
        order: {
          id: 'DESC',
        },
        take: 1,
      });
  
      let newId: string;
  
      if (entity && entity.length > 0) {
        const lastId = entity[0].id;
        const parts = lastId.split('-');
        const lastPart = parts[parts.length - 1];
        const count = parseInt(lastPart);
        if (!isNaN(count)) {
          const incrementedCount = count + 1;
          parts[parts.length - 1] = incrementedCount.toString().padStart(4, '0');
          newId = parts.join('-');
        }
      } else {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString().substr(-2);
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        newId = `MM-${month}${year}-0001`;
      }
  
      console.log(newId);
      return newId;
    } catch (error) {
      // Handle the error
      console.error(error);
      throw new Error('Failed to retrieve the last entity.');
    }
  }
  
  
  async addUnit(data: UnitDTO): Promise<UnitEntity>{
    data.id = await this.findLastId()
    return this.unitRepo.save(data);
  }
}