import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) { }

  async findLastUserId(): Promise<string> {
    try {
      const entity = await this.userRepo.find({
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
      console.log(newId);
      return newId;
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve the last Id');
    }
  }

  updateUser(data: UserDTO): UserDTO {
    return data;
  }

  async addUser(user: UserDTO): Promise<UserDTO> {
    return this.userRepo.save(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  async getUserById(id:string):Promise<UserEntity>{
    return await this.userRepo.findOneBy({id:id});
  }
}