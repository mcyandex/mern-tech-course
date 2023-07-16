import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { GigManagerEntity } from "./gigManager.entity";
import { GigManagerDTO } from "./gigManager.dto";

@Injectable()
export class GigManagerService {
  constructor(
    @InjectRepository(GigManagerEntity) private gigManagerRepo: Repository<GigManagerEntity>,
  ){}

  getGigManagerWithUserInfo(): Promise<GigManagerEntity[]>{
    return this.gigManagerRepo.find({relations: {
      login:true,
      gig:true
    }})
  }

  getGigManagerByUserName(name: string): Promise<GigManagerEntity[]> {
    const finalName = name + '%'
    return this.gigManagerRepo.find({
      where: {
        login: {
          name: ILike(`${finalName}`)
        },
      },
      relations: {
        login: true,
        gig: true
      }
    });
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
  async findLastUserGigManagerId(): Promise<string> {
    try {
      const entity = await this.gigManagerRepo.find({
        select: ["id"],
        order: {
          id: 'DESC',
        },
        take: 1,
      });
      let newIdCount: string;

      if (entity && entity.length > 0) {
        const lastId = entity[0].id;
        const parts = lastId.split('-');
        const lastPart = parts[parts.length - 1];
        const count = parseInt(lastPart);
        if (!isNaN(count)) {
          const incrementedCount = count + 1;
          newIdCount = incrementedCount.toString().padStart(4, '0');
        }
      }
      else {
        newIdCount = `0001`;
      }
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString().substr(-2);
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const newId = `MM-${month}${year}-${newIdCount}`;
      return newId;
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve the last Id');
    }
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
