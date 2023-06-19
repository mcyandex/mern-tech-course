import { Injectable } from '@nestjs/common';
import { DivisionDTO } from './Division.dto';

@Injectable()
export class DivisionService {
  getDivision(): DivisionDTO {
    return {id:"102",name:"Manager",updatedBy:"sadia"};
  }

  getDivisionByName(name: string): DivisionDTO{
    return {id:"102",name:"Manager",updatedBy:"sadia"};
  }

  updateDivision(data: DivisionDTO): string{
    return data.name;
  }

  deleteDivision(id: string): string{
    return "Division ---- deleted";
  }

  addDivision(data: DivisionDTO): string{
    return data.name;
  }
}