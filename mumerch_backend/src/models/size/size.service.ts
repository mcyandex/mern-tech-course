import { ConflictException, Injectable } from '@nestjs/common';
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
  getSize(): Promise<SizeEntity[]> {
    return this.sizeRepo.find();
  }
  getSizeByIdWithLoginInfo(id: string): Promise<SizeEntity> {
    return this.sizeRepo.findOne({
      where: {
        id:id
      },
      relations: {
        login: true,
      }
    });
  }

  getSizeById(id: string): Promise<SizeEntity> {
    return this.sizeRepo.findOneBy({ id: id });
  }

  getSizeByUserId(uid: string, sid: string): Promise<SizeEntity> {
    return this.sizeRepo.findOne({
      where: {
        id: sid,
        login: { id: uid },
      },
      relations: {
        login: true,
      }

    });
  }

  async getSizeByName(name: string): Promise<SizeEntity[]> {
    // console.log(name)
    return await this.sizeRepo.find({
      where: {
        name: ILike(`${name}`)
      },
    })
  }

  async getSizeByNameWithLoginInfo(name: string): Promise<SizeEntity[]> {
    //console.log(name)
    return await this.sizeRepo.find({
      where: {
        name: ILike(`${name}`)
      },
      relations: {
        login: true
      }
    })
  }

  async updateSize(id: string, data: SizeDTO): Promise<SizeEntity> {
    await this.sizeRepo.update(id, data)
    return await this.sizeRepo.findOneBy({ id: id })
  }

  deleteSize(id: string): Promise<DeleteResult> {
    return this.sizeRepo.delete(id);
  }

  async addSize(data: SizeDTO): Promise<SizeEntity> {
    return this.sizeRepo.save(data).catch(err => {
      throw new ConflictException({
        message: err.message
      });
    });
  }
}