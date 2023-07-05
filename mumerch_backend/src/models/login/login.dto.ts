import {IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDTO{
    @IsNotEmpty()
    @Matches(/^MM-(0[1-9]||1[0-2])\d{2}-([\d]{3}1|[1-9]\d{3})/,{message:"Must follow proper format"})
    id:string

    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name:string

    @IsNotEmpty({message:"Usertype name must have a value"})
    userType:string

    @IsNotEmpty({message:"Email must have a value"})
    @IsEmail({},{message:"Give a proper email"})
    email:string

    @IsNotEmpty({message:"Phone name must have a value"})
    @IsString({message:"Phone name must have a string"})
    @Matches(/^01[6-9|3|4]\d{8}$/, {message:"Phone name can contain only letters and numbers"})
    phoneNumber:string

    @IsNotEmpty({message:"Password must have a value"})
    @Matches(/^(?=.*[@$&!_-])[A-Za-z0-9@$&!_-]{6,}$/, {message:"Enter a proper Password with length 6 with 1 special character from this set [@,$,&,!,_,-]"})
    password:string

    @IsNotEmpty()
    designation:string
}

export class LoginRegistrationDTO{
    id:string

    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name:string

    @IsNotEmpty({message:"Usertype name must have a value"})
    userType:string

    @IsNotEmpty({message:"Email must have a value"})
    @IsEmail({},{message:"Give a proper email"})
    email:string

    @IsNotEmpty({message:"Phone name must have a value"})
    @Matches(/^01[6-9|3|4]\d{8}$/, {message:"Phone name can contain only letters and numbers"})
    phoneNumber:string

    password:string

    @IsNotEmpty()
    designation:string
}

export class Login{
    @IsNotEmpty()
    @Matches(/^MM-(0[1-9]||1[0-2])\d{2}-(\d{3}[1-9]|[1-9]\d{3})/,{message:"Must follow proper format"})
    id:string
    @IsNotEmpty({message:"Password must have a value"})
    @Matches(/^(?=.*[@$&!_-])[A-Za-z0-9@$&!_-]{6,}$/, {message:"Enter a proper Password with length 6 with 1 special character from this set [@,$,&,!,_,-]"})
    password:string
}

export class ResetPassword{
    @IsNotEmpty({message:"Old Password must have a value"})
    @Matches(/^(?=.*[@$&!_-])[A-Za-z0-9@$&!_-]{6,}$/, {message:"Enter a proper Password with length 6 with 1 special character from this set [@,$,&,!,_,-]"})
    oldPassword:string
    @IsNotEmpty({message:"New Password must have a value"})
    @Matches(/^(?=.*[@$&!_-])[A-Za-z0-9@$&!_-]{6,}$/, {message:"Enter a proper Password with length 6 with 1 special character from this set [@,$,&,!,_,-]"})
    password:string
    @IsNotEmpty({message:"New Password must have a value"})
    @Matches(/^(?=.*[@$&!_-])[A-Za-z0-9@$&!_-]{6,}$/, {message:"Enter a proper Password with length 6 with 1 special character from this set [@,$,&,!,_,-]"})
    reTypePassword:string
}