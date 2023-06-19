import { Injectable } from '@nestjs/common';
import { DepartmentDTO } from './Department.dto';

@Injectable()
export class DepartmentService {
  getDepartment(): DepartmentDTO {
    return {id:"102",name:"F",updatedBy:"sadia"};
  }

  getDepartmentByName(name: string): DepartmentDTO{
    return {id:"102",name:"XL",updatedBy:"sadia"};
  }

  updateDepartment(data: DepartmentDTO): string{
    return data.name;
  }

  deleteDepartment(id: string): string{
    return "Department ---- deleted";
  }

  addDepartment(data: DepartmentDTO): string{
    return data.name;
  }
}