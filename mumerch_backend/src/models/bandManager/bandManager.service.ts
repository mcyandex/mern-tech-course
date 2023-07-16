import { Injectable } from "@nestjs/common";
import { BandManagerEntity } from "./bandManager.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { BandManagerDTO } from "./bandManager.dto";

@Injectable()
export class BandManagerService {
  constructor(
    @InjectRepository(BandManagerEntity) private bandManagerRepo: Repository<BandManagerEntity>,
  ) { }

  getBandManagerWithUserInfo(): Promise<BandManagerEntity[]> {
    return this.bandManagerRepo.find({
      relations: {
        login: true,
        band: true
      }
    })
  }
  async getBandManager(): Promise<BandManagerEntity[]> {
    return await this.bandManagerRepo.find({
      relations: {
        login: true,
        band: true
      }
    });
  }
  getBandManagerByUserName(name: string): Promise<BandManagerEntity[]> {
    const finalName = name + '%'
    return this.bandManagerRepo.find({
      where: {
        login: {
          name: ILike(`${finalName}`)
        },
      },
      relations: {
        login: true,
        band: true
      }
    });
  }
  getBandManagerById(id: string): Promise<BandManagerEntity> {
    return this.bandManagerRepo.findOne({
      where: {
        id: id
      },
      relations: {
        login: true,
      }
    });
  }

  async updateBandManager(id: string, data: BandManagerDTO): Promise<BandManagerEntity> {
    await this.bandManagerRepo.update(id, data)
    return await this.bandManagerRepo.findOneBy({ id: id })
  }

  deleteBandManager(id: string): Promise<DeleteResult> {
    return this.bandManagerRepo.delete(id);
  }

  addBandManager(data: BandManagerDTO): Promise<BandManagerEntity> {
    return this.bandManagerRepo.save(data);
  }
}
