import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./category.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoryDTO } from "./category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>,
  ){}

  getCategoryWithUserInfo(): Promise<CategoryEntity[]>{
    return this.categoryRepo.find({relations: ['user']})
  }

  async getCategory(): Promise<CategoryEntity[]> {
    return await this.categoryRepo.find();
  }
  getAllCategoryByUserId(id:string): Promise<CategoryEntity>{
    return this.categoryRepo.findOne({
        where:{
          login: {id: id},
        },
        relations: {
          login: true,
        }
      });
  }
  getCategoryByUserId(id: string): Promise<CategoryEntity>{
    return this.categoryRepo.findOne({
      where:{
        id: id
      },
      relations:{
        login: true,
      }
    });
  }
  async getCategoryByName(name: string): Promise<CategoryEntity[]> {
    let finalName = name + '%'
    console.log(finalName)
    return await this.categoryRepo.find({
      where: {
        name: ILike(`${finalName}`)
      },
    })
  }
  async updateCategory(id: string, data: CategoryDTO): Promise<CategoryEntity>{
    await this.categoryRepo.update(id,data)
    return await this.categoryRepo.findOneBy({id: id})
  }

  deleteCategory(id: string): Promise<DeleteResult>{
    return this.categoryRepo.delete(id);
  }

  addCategory(data: CategoryDTO): Promise<CategoryEntity>{
    return this.categoryRepo.save(data);
  }
}