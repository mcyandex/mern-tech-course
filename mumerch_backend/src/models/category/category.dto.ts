import { IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { ProductEntity } from "../product/product.entity";

export class CategoryDTO {
  id: string
  @IsNotEmpty({ message: "Name must have a value" })
  @IsString({ message: "Name must have a string" })
  @Matches(/^[A-Z][a-zA-Z ]+$/, { message: "Enter a proper name" })
  name: string
  login: LoginDTO
  products: ProductEntity[]
}
