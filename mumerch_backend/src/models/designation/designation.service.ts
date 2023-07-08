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

  getDesignation(): Promise <DesignationDTO[]>{
    return this.designationRepo.find();
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
        login: true,
      }
    });
  }
  async getDesignationByName(name: string): Promise<DesignationDTO[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.designationRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }
  async updateDesignation(id: string, data: DesignationDTO): Promise<DesignationDTO>{
    await this.designationRepo.update(id,data)
    return await this.designationRepo.findOneBy({id: id})
  }

  deleteDesignation(id: string): Promise<DeleteResult>{
    return this.designationRepo.delete(id);
  }

  addDesignation(data: DesignationDTO): Promise<DesignationDTO>{
    return this.designationRepo.save(data);
  }
}