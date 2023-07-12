import { Injectable } from "@nestjs/common";
import { BandManagerEntity } from "./bandManager.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { BandManagerDTO } from "./bandManager.dto";

@Injectable()
export class BandManagerService {
  constructor(
    @InjectRepository(BandManagerEntity) private bandManagerRepo: Repository<BandManagerEntity>,
  ){}

  getBandManagerWithUserInfo(): Promise<BandManagerEntity[]>{
    return this.bandManagerRepo.find({relations: ['user']})
  }

  async getBandManager(): Promise<BandManagerEntity[]> {
    return await this.bandManagerRepo.find();
  }
  getAllBandManagerByUserId(id:string): Promise<BandManagerEntity>{
    return this.bandManagerRepo.findOne({
        where:{
          login: {id: id},
        },
        relations: {
          login: true,
        }
      });
  }
  getBandManagerByUserId(id: string): Promise<BandManagerEntity>{
    return this.bandManagerRepo.findOne({
      where:{
        id: id
      },
      relations:{
        login: true,
      }
    });
  }

  async updateBandManager(id: string, data: BandManagerDTO): Promise<BandManagerEntity>{
    await this.bandManagerRepo.update(id,data)
    return await this.bandManagerRepo.findOneBy({id: id})
  }

  deleteBandManager(id: string): Promise<DeleteResult>{
    return this.bandManagerRepo.delete(id);
  }

  addBandManager(data: BandManagerDTO): Promise<BandManagerEntity>{
    return this.bandManagerRepo.save(data);
  }
}
