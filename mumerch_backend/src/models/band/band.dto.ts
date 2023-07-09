import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { BandManagerDTO } from "../bandManager/bandManager.dto";

export class BandDTO{
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
    
    image:string
    login:LoginDTO
    bandManager:BandManagerDTO
}

export class BandResgistrationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name:string

    // @IsDate()
    // @IsNotEmpty({message:"Start date is required"})
    // onBoardDate: Date

    // @IsNotEmpty({message:"Updater Name must have a value"})
    // updatedBy:string
    
    image:string
    login:LoginDTO
    //bandManager:BandManagerDTO
}