import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { TokenEntity } from './token.entity';
import { TokenDTO } from './token.dto';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity) private tokenRepo: Repository<TokenEntity>,
  ) { }

  getTokenById(id:string):Promise<TokenEntity>{
    return this.tokenRepo.findOneBy({id:id});
  }

  getTokenByLoginId(id:string):Promise<TokenEntity>{
    return this.tokenRepo.findOne({
      where:{
        login:{id:id}
      }
    })
  }

  async updateToken(id: string, data: TokenDTO): Promise<TokenEntity> {
    await this.tokenRepo.update(id, data)
    return await this.tokenRepo.findOneBy({ id: id })
  }

  deleteToken(id: string): Promise<DeleteResult> {
    return this.tokenRepo.delete(id);
  }

  addToken(data: TokenDTO): Promise<TokenEntity> {
    return this.tokenRepo.save(data);
  }

  generateRandomNumber(): string {
    const randomNumber = crypto.randomInt(100000, 999999);
    return randomNumber.toString();
  }
  generateMaskedMail(email:string):string{
    const split = email.split('@')
    const mail = split[0]
    const len = mail.length
    const mask = mail.substring(0,2)
    const maskedMail = mask+'*'.repeat(len-2)
    return "A recovery code send to: "+maskedMail+'@'+split[1]
  }
}