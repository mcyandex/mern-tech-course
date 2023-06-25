import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitEntity } from './unit.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { UnitDTO, UnitRegistrationDTO } from './unit.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity) private unitRepo: Repository<UnitEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) { }

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
    const unit = await this.unitRepo.findOneBy({id:qry.id})
    if(unit==null){
      throw new NotFoundException(`Unit with ID ${qry.id} not found`);
    }
    else{
      const user = await this.userRepo.findOneBy({id:qry.id})
      unit.user=user
      unit.name=data.name
      await this.unitRepo.save(unit)
      return this.unitRepo.findOneBy({id:unit.id})
    }
  }
  async deleteUnit(id: string): Promise<DeleteResult> {
    return await this.unitRepo.delete(id);
  }
  async addUnit(data: UnitEntity): Promise<UnitDTO> {
    return await this.unitRepo.save(data);
  }
}