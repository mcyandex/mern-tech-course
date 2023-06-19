import { Injectable } from '@nestjs/common';
import { UnitDTO } from './unit.dto';

@Injectable()
export class UnitService {
  getUnit(): UnitDTO {
    return {id:"100",name:"M",updatedBy:"elahi"};
  }

  getUnitByName(name: string): UnitDTO{
    return {id:"100",name:"XL",updatedBy:"elahi"};
  }

  updateUnit(data: UnitDTO): string{
    return data.name;
  }

  deleteUnit(id: string): string{
    return "Unit ---- deleted";
  }

  addUnit(data: UnitDTO): string{
    return data.name;
  }
}