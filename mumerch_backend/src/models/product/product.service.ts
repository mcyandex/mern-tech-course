import { Injectable } from '@nestjs/common';
import { Console } from 'console';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  getProduct(): ProductDTO {
    return {id:100,name:"Tshirt",updatedBy:"elahi",image:"aaa",quantity:50,sellingPrice:1500,revenuePercentage:30};
  }

  getProductByName(name: string): ProductDTO{
    console.log(name)
    return {id:100,name:"Tshirt",updatedBy:"elahi",image:"aaa",quantity:50,sellingPrice:1500,revenuePercentage:30};
  }

  updateProduct(data: ProductDTO): string{
    return data.name;
  }

  deleteProduct(id: number): string{
    console.log(id)
    return "-- deleted";
  }

  addProduct(data: ProductDTO): string{
    return data.name;
  }
}