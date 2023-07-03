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

  async getSizeWithUserInfo(): Promise<SizeEntity[]> {
    return await this.sizeRepo.find({ relations: ['user'] });
  }
  async getSize(): Promise<SizeDTO[]> {
    return await this.sizeRepo.find();
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