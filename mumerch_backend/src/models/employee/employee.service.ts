import { Injectable } from '@nestjs/common';
import { EmployeeResgistrationDTO } from './employee.dto';

@Injectable()
export class EmployeeService {

  updateEmployee(data: EmployeeResgistrationDTO): EmployeeResgistrationDTO{
    return data;
  }

  addEmployee(data: EmployeeResgistrationDTO): EmployeeResgistrationDTO{
    return data;
  }
}