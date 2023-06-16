import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class AdminDTO{
    @IsNotEmpty({message:"This filed is required"})
    @Matches(/^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;

    fatherName: string

    motherName: string; 

    @IsNotEmpty({message:"This filed is required"})
    @Matches("")
    dateOfBirth: Date;

    nidNo: string;

    parmanentAddress: string;

    userId: string;

    @IsNotEmpty({message:"This filed is required"})
    @Matches("")
    password: string;

    userType: string;

    @IsEmail({}, {message:"invalid email"})
    @IsNotEmpty({message:"This filed is required"})
    email: string;

    phoneNo: string;

    designation: string;
}