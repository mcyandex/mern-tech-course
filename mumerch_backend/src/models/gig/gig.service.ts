import { Injectable } from "@nestjs/common";
import { GigDTO } from "./gig.dto";
import { GigEntity } from "./gig.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class GigService {
  constructor(
    @InjectRepository(GigEntity) private gigRepo: Repository<GigEntity>,
  ){}

  getGigWithUserInfo(): Promise<GigEntity[]>{
    return this.gigRepo.find({relations: ['user']})
  }

  async getGig(): Promise<GigEntity[]> {
    return await this.gigRepo.find();
  }
  async getGigById(id:string): Promise<GigEntity> {
    return await this.gigRepo.findOneBy({id:id});
  }
  getGigByGigMId(id:string): Promise<GigEntity>{
    return this.gigRepo.findOne({
        where:{
          gigManager: {id: id},
        },
      });
  }
  getGigByUserId(id: string): Promise<GigEntity>{
    return this.gigRepo.findOne({
      where:{
        id: id
      },
      relations:{
        login: true,
      }
    });
  }
  getGigByBandId(bandId: string): Promise<GigEntity>{
    return this.gigRepo.findOne({
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
  async getGigByName(name: string): Promise<GigEntity[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.gigRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }
  async updateGig(id: string, data: GigEntity): Promise<GigEntity>{
    await this.gigRepo.update(id,data)
    return await this.gigRepo.findOneBy({id: id})
  }

  deleteGig(id: string): Promise<DeleteResult>{
    return this.gigRepo.delete(id);
  }

  addGig(data: GigDTO): Promise<GigEntity>{
    return this.gigRepo.save(data);
  }

  getCount():any{
    return this.gigRepo.count()
  }
}