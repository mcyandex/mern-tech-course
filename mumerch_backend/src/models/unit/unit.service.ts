import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitEntity } from './unit.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { UnitDTO, UnitRegistrationDTO } from './unit.dto';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity) private unitRepo: Repository<UnitEntity>,
  ) {}

  async getUnitWithUserInfo(): Promise<UnitEntity[]> {
    return await this.unitRepo.find({ relations: ['user'] });
  }
  async getUnit(): Promise<UnitEntity[]> {
    return await this.unitRepo.find();
  }
  async getUnitByName(name: string): Promise<UnitDTO[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.unitRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }
  async updateUnit(qry:any, data: UnitDTO): Promise<UnitDTO> {
    await this.unitRepo.update(qry.id, data)
    return await this.unitRepo.findOneBy({id:qry.id})
  }
  async deleteUnit(id: string): Promise<DeleteResult> {
    return await this.unitRepo.delete(id);
  }
  async addUnit(data: UnitDTO): Promise<UnitDTO> {
    return await this.unitRepo.save(data);
  }
}