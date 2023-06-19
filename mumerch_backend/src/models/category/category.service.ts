import { Injectable } from "@nestjs/common";
import { CategoryDTO } from "./category.dto";
import { Console } from 'console';

@Injectable()
export class CategoryService{

    getCategory(data: CategoryDTO): string {
        return data.name;
      }

    updateCategory(data: CategoryDTO): string {
        return data.name;
      }

    addCategory(data: CategoryDTO): string {
        return data.name;
      }

    deleteCategory(id: string): string{
        console.log(id)
        return "A category section has been deleted";
      }



}