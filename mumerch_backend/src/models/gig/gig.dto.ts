import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class GigDTO{
    id:string
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name:string

    @IsDate()
    @IsNotEmpty({message:"Start date is required"})
    startDate: Date

    @IsNotEmpty({message:"End date is required"})
    @IsDate()
    endDate: Date

    @IsNotEmpty({message:"Updater Name must have a value"})
    updatedBy:string
    image:string
    locationId:string
}

export class GigResgistrationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name:string

    @IsNotEmpty({message:"Start date is required"})
    startDate: Date

    @IsNotEmpty({message:"End date is required"})
    endDate: Date

    @IsNotEmpty({message:"Updater Name must have a value"})
    updatedBy:string
    locationId:string
}