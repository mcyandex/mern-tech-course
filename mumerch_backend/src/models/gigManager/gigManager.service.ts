import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { GigManagerEntity } from "./gigManager.entity";
import { GigManagerDTO } from "./gigManager.dto";

@Injectable()
export class GigManagerService {
  constructor(
    @InjectRepository(GigManagerEntity) private gigManagerRepo: Repository<GigManagerEntity>,
  ){}

  getGigManagerWithUserInfo(): Promise<GigManagerEntity[]>{
    return this.gigManagerRepo.find({relations: ['user']})
  }

  async getGigManager(): Promise<GigManagerEntity[]> {
    return await this.gigManagerRepo.find();
  }
  getAllGigManagerByUserId(id:string): Promise<GigManagerEntity>{
    return this.gigManagerRepo.findOne({
        where:{
          login: {id: id},
        },
        relations: {
          login: true,
        }
      });
  }
  getGigManagerByUserId(id: string): Promise<GigManagerEntity>{
    return this.gigManagerRepo.findOne({
      where:{
        id: id
      },
      relations:{
        login: true,
      }
    });
  }

  async updateGigManager(id: string, data: GigManagerDTO): Promise<GigManagerEntity>{
    await this.gigManagerRepo.update(id,data)
    return await this.gigManagerRepo.findOneBy({id: id})
  }

  deleteGigManager(id: string): Promise<DeleteResult>{
    return this.gigManagerRepo.delete(id);
  }

  addGigManager(data: GigManagerDTO): Promise<GigManagerEntity>{
    return this.gigManagerRepo.save(data);
  }
}
