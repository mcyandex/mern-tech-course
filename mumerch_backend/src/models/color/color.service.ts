import { Injectable } from "@nestjs/common";
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
    let finalName = name + '%'
    console.log(finalName)
    return await this.colorRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }
  async updateColor(id: string, data: ColorDTO): Promise<ColorEntity> {
    await this.colorRepo.update(id, data)
    return await this.colorRepo.findOneBy({ id: id })
  }
  deleteColor(id: string): Promise<DeleteResult> {
    return this.colorRepo.delete(id);
  }
  addColor(data: ColorDTO): Promise<ColorEntity> {
    return this.colorRepo.save(data);
  }
}