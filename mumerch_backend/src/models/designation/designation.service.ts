import { Injectable } from '@nestjs/common';
import { DesignationDTO } from './Designation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DesignationEntity } from './designation.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class DesignationService {
  constructor(
    @InjectRepository(DesignationEntity) private designationRepo: Repository<DesignationEntity>,
  ){}

  getDesignationWithUserInfo(): Promise<DesignationEntity[]>{
    return this.designationRepo.find({relations: ['user']})
  }

  getDesignation(): Promise <DesignationEntity[]>{
  return this.designationRepo.find({
    select:{
      id:true,
      name:true
    }
  });
  }
  getAllDesignationByUserId(id:string): Promise<DesignationEntity>{
    return this.designationRepo.findOne({
        where:{
          login: {id: id},
        },
        relations: {
          login: true,
        }
      });
  }
  getDesignationByUserId(id: string): Promise<DesignationEntity>{
    return this.designationRepo.findOne({
      where:{
        id: id
      },
      relations:{
        updater: true,
      }
    });
  }
  async getDesignationByName(name: string): Promise<DesignationEntity[]> {
    return await this.designationRepo.find({
      where: {
        name: ILike(`${name}`)
      },
      relations:{
        updater:true
      }
    })
  }
  async updateDesignation(id: string, data: DesignationDTO): Promise<DesignationEntity>{
    await this.designationRepo.update(id,data)
    return await this.designationRepo.findOneBy({id: id})
  }

  deleteDesignation(id: string): Promise<DeleteResult>{
    return this.designationRepo.delete(id);
  }

  async addDesignation(data: DesignationDTO): Promise<DesignationEntity>{
    return await this.designationRepo.save(data);
  }
}