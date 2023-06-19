import { Injectable } from "@nestjs/common";
import { CustomerResgistrationDTO } from "./customer.dto";

@Injectable()
export class CustomerService{

    viewCustomer(data: CustomerResgistrationDTO): CustomerResgistrationDTO{
        return data;
      } 
      
    updateCustomer(data: CustomerResgistrationDTO): CustomerResgistrationDTO{
        return data;
      }
    
    addCustomer(data: CustomerResgistrationDTO): CustomerResgistrationDTO{
        return data;
      }
}