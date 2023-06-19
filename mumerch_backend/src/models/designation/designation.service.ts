import { Injectable } from '@nestjs/common';
import { DesignationDTO } from './Designation.dto';

@Injectable()
export class DesignationService {
  getDesignation(): DesignationDTO {
    return {id:"102",name:"Manager",updatedBy:"sadia"};
  }

  getDesignationByName(name: string): DesignationDTO{
    return {id:"102",name:"Manager",updatedBy:"sadia"};
  }

  updateDesignation(data: DesignationDTO): string{
    return data.name;
  }

  deleteDesignation(id: string): string{
    return "Designation ---- deleted";
  }

  addDesignation(data: DesignationDTO): string{
    return data.name;
  }
}