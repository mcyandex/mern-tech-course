import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UnitEntity } from '../unit/unit.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>){}

  async findLastUserId(): Promise<string> {
    try {
      const entity = await this.userRepo.find({
        select: ["id"],
        order: {
          id: 'DESC',
        },
        take: 1,
      });
  
      let newId: string;
  
      if (entity && entity.length > 0) {
        const lastId = entity[0].id;
        const parts = lastId.split('-');
        const lastPart = parts[parts.length - 1];
        const count = parseInt(lastPart);
        if (!isNaN(count)) {
          const incrementedCount = count + 1;
          parts[parts.length - 1] = incrementedCount.toString().padStart(4, '0');
          newId = parts.join('-');
        }
      } 
      else {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString().substr(-2);
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        newId = `MM-${month}${year}-0001`;
      }
      console.log(newId);
      return newId;
    } 
    catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve the last Id');
    }
  }

  updateUser(data: UserDTO): UserDTO{
    return data;
  }

  async addUser(user: UserDTO): Promise<UserDTO> {
    return this.userRepo.save(user);
  }

  async getAllUsers(): Promise<UserDTO[]> {
    return this.userRepo.find();
  }
    
    
}