import { Injectable, Session, UnauthorizedException } from "@nestjs/common";

import { LoginEntity } from "./login.entity";

import { InjectRepository } from "@nestjs/typeorm";

import { DeleteResult, ILike, Repository } from "typeorm";

import { Login, LoginDTO, LoginRegistrationDTO, ResetPassword } from "./login.dto";

import * as bcrypt from 'bcrypt';

import session from "express-session";




@Injectable()

export class LoginService {

  constructor(

    @InjectRepository(LoginEntity) private loginRepo: Repository<LoginEntity>

  ) { }




  async findLastUserLoginId(): Promise<string> {

    try {

      const entity = await this.loginRepo.find({

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

  getUserLoginInfo(): Promise<LoginDTO[]> {

    return this.loginRepo.find();

  }

  getUserLoginInfoByName(name: string): Promise<LoginDTO[]> {

    let finalName = name + '%'

    console.log(finalName)

    return this.loginRepo.find({

      where: {

        name: ILike(`${finalName}`)

      },

    })

  }

  getUserLoginInfoById(id: string): Promise<LoginDTO> {

    return this.loginRepo.findOneBy({ id: id })

  }

  async updateUserLoginInfo(qry: any, data: LoginEntity): Promise<LoginDTO> {

    console.log(data)

    const salt = await bcrypt.genSalt();

    const hassedpassed = await bcrypt.hash(data.password, salt);

    data.password = hassedpassed

    await this.loginRepo.update(qry.id, data)

    return await this.loginRepo.findOneBy({ id: qry.id })

  }

  deleteUserLoginInfo(id: string): Promise<DeleteResult> {

    return this.loginRepo.delete(id);

  }

  addUserLoginInfo(data: LoginRegistrationDTO): Promise<LoginRegistrationDTO> {

    return this.loginRepo.save(data);

  }

  async login(data: Login) {

    const user = await this.loginRepo.findOneBy({ id: data.id })

    const match: boolean = await bcrypt.compare(data.password, user.password);

    if (match) {

      return user

    }

    return new UnauthorizedException({message:"User Id or Password didn't match"})

  }

  async getAllColorAssociatedWithUserById(id: string): Promise<LoginEntity[]> {

    return this.loginRepo.find({

      where: { id: id },

      relations: {

        colors: true,

      },

    });

  }

  async getAllSizeAssociatedWithUserById(id: string): Promise<LoginEntity[]> {

    return this.loginRepo.find({

      where: { id: id },

      relations: {

        sizes: true,

      },

    });

  }

}