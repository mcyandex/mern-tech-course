import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class EmployeeDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name:string

    id: string

    passport: string
    
    tinNo: string

    nidNo: string

    @IsNotEmpty({message:"Father's Name must have a value"})
    @IsString({message:"Father's Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper Father's name"})
    fatherName:string

    @IsNotEmpty({message:"motherName must have a value"})
    @IsString({message:"motherName must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper mothername"})
    motherName:string

    @IsDate()
    dateOfBirth: Date

    @IsNotEmpty({message:"Blood Group must have a value"})
    @Matches(/^(A|B|AB|O)[+-]$/, {message:"Enter a proper Blood Group"})
    bloodGroup: string

    @IsNotEmpty({message:"Password must have a value"})
    @Matches(/^(?=.*[@$&!_-])[A-Za-z0-9@$&!_-]{6,}$/, {message:"Enter a proper Password with length 6 with 1 special character from this set [@,$,&,!,_,-]"})
    password:string

    @IsNotEmpty({message:"Employee name must have a value"})
    @IsString({message:"Employee name must have a string"})
    @Matches(/^[a-zA-Z0-9]+$/, {message:"Employee name can contain only letters and numbers"})
    employeename:string

    @IsNotEmpty({message:"Employeetype name must have a value"})
    EmployeeType:string

    @IsNotEmpty({message:"Email must have a value"})
    @IsEmail({},{message:"Give a proper email"})
    email:string

    @IsNotEmpty({message:"Employee name must have a value"})
    @IsString({message:"Employee name must have a string"})
    @Matches(/^01[7-9|36|4]\d{8}$/, {message:"Employee name can contain only letters and numbers"})
    phoneNumber:string

    image:string

    designation:string
}

export class EmployeeResgistrationDTO{
    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name:string

    @IsNotEmpty({message:"Father's Name must have a value"})
    @IsString({message:"Father's Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper Father's name"})
    fatherName:string

    @IsNotEmpty({message:"motherName must have a value"})
    @IsString({message:"motherName must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper mothername"})
    motherName:string

    @IsDate()
    dateOfBirth: Date

    @IsNotEmpty({message:"Blood Group must have a value"})
    @Matches(/^(A|B|AB|O)[+-]$/, {message:"Enter a proper Blood Group"})
    bloodGroup: string

    @IsNotEmpty({message:"Password must have a value"})
    @Matches(/^(?=.*[@$&!_-])[A-Za-z0-9@$&!_-]{6,}$/, {message:"Enter a proper Password with length 6 with 1 special character from this set [@,$,&,!,_,-]"})
    password:string


    @IsNotEmpty({message:"Employee name must have a value"})
    @IsString({message:"Employee name must have a string"})
    @Matches(/^[a-zA-Z0-9]+$/, {message:"Employee name can contain only letters and numbers"})
    Employeename:string

    @IsNotEmpty({message:"Employeetype name must have a value"})
    EmployeeType:string

    @IsNotEmpty({message:"Email must have a value"})
    @IsEmail({},{message:"Give a proper email"})
    email:string

    @IsNotEmpty({message:"Employee name must have a value"})
    @IsString({message:"Employee name must have a string"})
    @Matches(/^01[7-9|36|4]\d{8}$/, {message:"Employee name can contain only letters and numbers"})
    phoneNumber:string

    designation:string
}