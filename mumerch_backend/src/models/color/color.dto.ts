import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { LoginEntity } from "../login/login.entity";
import { ProductDetailsEntity } from "../productDetails/productDetails.entity";


export class ColorDTO{
    
    @IsNotEmpty({message:"Color must have a value"})
    @IsString({message:"Color must have a string"})
    @Matches(/^[A-Z][a-zA-Z]+$/, {message:"Enter a proper color name"})
    name: string;

    id: string;

    @IsNotEmpty({ message: "Color code must have a value" })
    @Matches(/^#([A-Fa-f0-9]{6})$/, { message: "Enter a valid color code in hexadecimal format" })
    colorCode: string;
    login:LoginEntity
    productDetails:ProductDetailsEntity[]
}

export class ColorRegistrationDTO{
    @IsNotEmpty({message:"Color must have a value"})
    @IsString({message:"Color must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"Enter a proper color name"})
    name: string;
    
    login:LoginEntity
}