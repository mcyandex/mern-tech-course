import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SizeEntity } from './size.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { SizeDTO } from './size.dto';
import session from 'express-session';


@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity) private sizeRepo: Repository<SizeEntity>,
  ) { }

  getSizeWithUserInfo(): Promise<SizeEntity[]> {
    return this.sizeRepo.find({ relations: ['user'] });
  }
  getSize(): Promise<SizeDTO[]> {
    return this.sizeRepo.find();
  }
  getAllSizeByUserId(id:string):Promise<SizeEntity>{
    return this.sizeRepo.findOne({
      where: {
        login: { id: id },
      },
      relations: {
        login: true,
    }
    });
  }

  getSizeById(id:string):Promise<SizeEntity>{
    return this.sizeRepo.findOneBy({id:id});
  }

  getSizeByUserId(uid:string, sid:string):Promise<SizeEntity>{
    return this.sizeRepo.findOne({
      where: {
        id:sid,
        login: { id: uid },
      },
      relations: {
        login: true,
    }

    });
  }
  
  async getSizeByName(name: string): Promise<SizeDTO[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.sizeRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }

  async updateSize(id: string, data: SizeDTO): Promise<SizeDTO> {
    await this.sizeRepo.update(id, data)
    return await this.sizeRepo.findOneBy({ id: id })
  }

  deleteSize(id: string): Promise<DeleteResult> {
    return this.sizeRepo.delete(id);
  }

  addSize(data: SizeDTO): Promise<SizeDTO> {
    return this.sizeRepo.save(data);
  }
}