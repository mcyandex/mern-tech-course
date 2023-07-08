import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { ProductDTO } from "../product/product.dto";

export class CategoryDTO{
        id:string
        @IsNotEmpty({message:"Name must have a value"})
        @IsString({message:"Name must have a string"})
        @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
        name:string
    
        // @IsDate()
        // @IsNotEmpty({message:"Start date is required"})
        // onBoardDate: Date
    
        // @IsNotEmpty({message:"Updater Name must have a value"})
        // updatedBy:string
        
        
        login:LoginDTO
       
}
    
    export class CategoryResgistrationDTO{
        @IsNotEmpty({message:"Name must have a value"})
        @IsString({message:"Name must have a string"})
        @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
        name:string
    

        
    
        login:LoginDTO
       
    }
