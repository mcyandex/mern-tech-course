import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "./customer.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CustomerDTO } from "./customer.dto";

@Injectable()
export class CustomerService{
  constructor(
    @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
  ){}

  getCustomerWithUserInfo(): Promise<CustomerEntity[]>{
    return this.customerRepo.find({relations: ['user']});
  }
  getCustomer(): Promise<CustomerEntity[]>{
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

  async getCustomerByName(name: string): Promise<CustomerEntity[]> {
    // console.log(name)
    return await this.customerRepo.find({
      where: {
        name: ILike(`${name}`)
      },
    })
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
  getCustomerByGigId(GigId: string): Promise<CustomerEntity>{
    return this.customerRepo.findOne({
      where:{
        orders:{
          gig:{
                id:GigId
              }
      }},
      relations:{
        orders:{
          gig: true
      }}
    });
  }
  getCustomerByBandId(bandId: string): Promise<CustomerEntity>{
    return this.customerRepo.findOne({
      where:{
        orders:{orderProducts:{
          productDetails:{
            product:{
              band:{
                id:bandId
              }
            }
          }
      }}},
      relations:{
        orders:{orderProducts:{
          productDetails:{
            product:{
              band:true

              
            }
          }
      }}
      }
    });
  }

  async updateCustomer(id: string, data: CustomerDTO): Promise<CustomerEntity>{
    await this.customerRepo.update(id,data)
    return await this.customerRepo.findOneBy({id: id})
  }

  deleteCustomer(id: string): Promise<DeleteResult>{
    return this.customerRepo.delete(id);
  }

  addCustomer(data: CustomerDTO): Promise<CustomerEntity>{
    return this.customerRepo.save(data);
  }

  getCount():any{
    return this.customerRepo.count()
  }
}