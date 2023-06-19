import { Injectable } from '@nestjs/common';
import { UserResgistrationDTO } from './user.dto';

@Injectable()
export class UserService {

  updateUser(data: UserResgistrationDTO): UserResgistrationDTO{
    return data;
  }

  addUser(data: UserResgistrationDTO): UserResgistrationDTO{
    return data;
  }
}