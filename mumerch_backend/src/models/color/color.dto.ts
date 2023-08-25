import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { LoginEntity } from "../login/login.entity";
import { ProductDetailsEntity } from "../productDetails/productDetails.entity";


export class ColorDTO{
    
    @IsNotEmpty({message:"Color must have a value"})
    @IsString({message:"Color must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper color name"})
    name: string;

    id: string;

    @IsNotEmpty({ message: "Color code must have a value" })
    colorCode: string;
    login:LoginEntity
    productDetails:ProductDetailsEntity[]
}