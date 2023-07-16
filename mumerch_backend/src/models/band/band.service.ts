import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { BandEntity } from "./band.entity";
import { BandDTO } from "./band.dto";

@Injectable()
export class BandService {
  constructor(
    @InjectRepository(BandEntity) private bandRepo: Repository<BandEntity>,
  ){}

  getBandWithUserInfo(): Promise<BandEntity[]>{
    return this.bandRepo.find({relations: ['user']})
  }

  async getBand(): Promise<BandEntity[]> {
    return await this.bandRepo.find();
  }

  async getBandById(id:string): Promise<BandEntity> {
    return await this.bandRepo.findOneBy({id:id});
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
  async getBandByName(name: string): Promise<BandEntity[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.bandRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }
  async updateBand(id: string, data: BandDTO): Promise<BandEntity>{
    await this.bandRepo.update(id,data)
    return await this.bandRepo.findOneBy({id: id})
  }

  deleteBand(id: string): Promise<DeleteResult>{
    return this.bandRepo.delete(id);
  }

  addBand(data: BandDTO): Promise<BandEntity>{
    return this.bandRepo.save(data);
  }
}