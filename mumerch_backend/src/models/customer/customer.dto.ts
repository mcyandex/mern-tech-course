import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CustomerDTO{
    @IsNotEmpty({message:"This filed is required"})
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



}

export class CustomerResgistrationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    name:string
    @IsNotEmpty({message:"Email must have a value"})
    @IsEmail()
    email:string
}