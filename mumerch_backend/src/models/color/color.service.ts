import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ColorEntity } from "./color.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { ColorDTO } from "./color.dto";

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity) private colorRepo: Repository<ColorEntity>,
  ) { }
  getColorWithUserInfo(): Promise<ColorEntity[]> {
    return this.colorRepo.find({ relations: ['user'] });
  }
  getAllColorByUserId(id:string):Promise<ColorEntity>{
    return this.colorRepo.findOne({
      where: {
        login: { id: id },
      },
      relations: {
        login: true,
    }
    });
  }
  getColorById(id:string):Promise<ColorEntity>{
    return this.colorRepo.findOneBy({id:id});
  }
  getColor():Promise<ColorEntity[]>{
    return this.colorRepo.find();
  }
  getColorByIdWithLoginInfo(id:string): Promise<ColorEntity> {
    return this.colorRepo.findOne({
      where:{
        id:id
      },
      relations:{
        login:true
      }
    });
  }
  async getColorByName(name: string): Promise<ColorEntity[]> {
    return await this.colorRepo.find({
      where: {
        name: ILike(`${name}`)
      },
      relations:{
        login:true
      }
    })
  }
  async updateColor(id: string, data: ColorDTO): Promise<ColorEntity> {
    await this.colorRepo.update(id, data)
    return await this.colorRepo.findOneBy({ id: id })
  }
  async deleteColor(id: string): Promise<DeleteResult> {
    return await this.colorRepo.delete(id);
  }
  async addColor(data: ColorDTO): Promise<ColorEntity> {
    return await this.colorRepo.save(data).catch(err => {
      throw new ConflictException({
        message: err.message
      });
    });
  }
}