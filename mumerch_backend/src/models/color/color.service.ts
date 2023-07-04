// import { Injectable } from "@nestjs/common";
// import { ColorDTO } from "./color.dto";
// import { Console } from 'console';

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ColorEntity } from "./color.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { ColorDTO } from "./color.dto";

// @Injectable()
// export class ColorService{

//     getColor(): ColorDTO {
//         return {id:"1",name:"Orange",updatedBy:"aneen", updatedAt:"1:00am"};
//       }
    
    
//       updateColor(data: ColorDTO): string{
//         return data.name;
//       }
    
//       deleteColor(id: string): string{
//         console.log(id)
//         return "deleted";
//       }
    
//       addColor(data: ColorDTO): string{
//         return data.name;
//       }
// }

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity) private colorRepo: Repository<ColorEntity>,
  ) { }

  async getColorWithUserInfo(): Promise<ColorEntity[]> {
    return await this.colorRepo.find({ relations: ['user'] });
  }
  async getColor(): Promise<ColorDTO[]> {
    return await this.colorRepo.find();
  }
  async getColorByName(name: string): Promise<ColorDTO[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.colorRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
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
  async updateColor(id: string, data: ColorDTO): Promise<ColorDTO> {
    await this.colorRepo.update(id, data)
    return await this.colorRepo.findOneBy({ id: id })
  }
  deleteColor(id: string): Promise<DeleteResult> {
    return this.colorRepo.delete(id);
  }
  addColor(data: ColorDTO): Promise<ColorDTO> {
    return this.colorRepo.save(data);
  }
}