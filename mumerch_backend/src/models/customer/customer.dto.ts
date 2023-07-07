import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { LoginDTO } from "../login/login.dto";

export class CustomerDTO{
    @IsNotEmpty({message:"This filed is required"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;

    @IsEmail({}, {message:"invalid email"})
    @IsNotEmpty({message:"This filed is required"})
    email: string;

    phoneNo: string;

    @IsNotEmpty({message:"This filed is required"})
    @Matches("")

    updatedAt: Date;

    id: string;

    address: string;
    login:LoginDTO

}

export class CustomerResgistrationDTO{
    @IsNotEmpty({message:"This filed is required"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[a-zA-Z]+$/, {message:"enter a proper name"})
    name:string
    @IsNotEmpty({message:"Email must have a value"})
    @IsEmail()
    email:string
}