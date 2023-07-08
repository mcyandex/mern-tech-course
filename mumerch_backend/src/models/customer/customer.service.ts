import { Injectable } from "@nestjs/common";
import { CustomerDTO, CustomerResgistrationDTO } from "./customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "./customer.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class CustomerService{
  constructor(
    @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
  ){}

  getCustomerWithUserInfo(): Promise<CustomerEntity[]>{
    return this.customerRepo.find({relations: ['user']});
  }
  getCustomer(): Promise<CustomerDTO[]>{
    return this.customerRepo.find();
  }
  getAllCustomerByUserId(id:string): Promise<CustomerEntity>{
    return this.customerRepo.findOne({
        where:{
          login: {id: id},
        },
        relations: {
          login: true,
        }
      });
  }
  getCustomerByUserId(id: string): Promise<CustomerEntity>{
    return this.customerRepo.findOne({
      where:{
        id: id
      },
      relations:{
        login: true,
      }
    });
  }

  async updateCustomer(id: string, data: CustomerDTO): Promise<CustomerDTO>{
    await this.customerRepo.update(id,data)
    return await this.customerRepo.findOneBy({id: id})
  }

  deleteCustomer(id: string): Promise<DeleteResult>{
    return this.customerRepo.delete(id);
  }

  addCustomer(data: CustomerDTO): Promise<CustomerDTO>{
    return this.customerRepo.save(data);
  }
}