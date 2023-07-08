// import { Injectable } from "@nestjs/common";
// import { BandDTO } from "./band.dto";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { BandEntity } from "./band.entity";
import { BandDTO } from "./band.dto";


// @Injectable()
// export class BandService {
//   //getBand(): BandDTO {
//   getBand(): string {
//     return "--------------- List of Band ---------------";
//   }

//   //getBandById(Id: string): BandDTO{
//   getBandById(id: string): string{
//     return "Specific Band fot ID: "+id;
//   }

//   updateBand(data: BandDTO): string{
//     return "Band updated";
//   }

//   deleteBand(id: string): string{
//     return "-- deleted";
//   }

//   addBand(data: BandDTO): string{
//     return "Band added";
//   }
// }


@Injectable()
export class BandService {
  constructor(
    @InjectRepository(BandEntity) private bandRepo: Repository<BandEntity>,
  ){}

  getBandWithUserInfo(): Promise<BandEntity[]>{
    return this.bandRepo.find({relations: ['user']})
  }

  async getBand(): Promise<BandDTO[]> {
    return await this.bandRepo.find();
  }
  getAllBandByUserId(id:string): Promise<BandEntity>{
    return this.bandRepo.findOne({
        where:{
          login: {id: id},
        },
        relations: {
          login: true,
        }
      });
  }
  getBandByUserId(id: string): Promise<BandEntity>{
    return this.bandRepo.findOne({
      where:{
        id: id
      },
      relations:{
        login: true,
      }
    });
  }
  async getBandByName(name: string): Promise<BandDTO[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.bandRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }
  async updateBand(id: string, data: BandDTO): Promise<BandDTO>{
    await this.bandRepo.update(id,data)
    return await this.bandRepo.findOneBy({id: id})
  }

  deleteBand(id: string): Promise<DeleteResult>{
    return this.bandRepo.delete(id);
  }

  addBand(data: BandDTO): Promise<BandDTO>{
    return this.bandRepo.save(data);
  }
}