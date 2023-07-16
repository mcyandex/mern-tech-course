import {IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { UserProfileEntity } from "../userProfile/userProfile.entity";
import { TokenEntity } from "../token/token.entity";
import { SizeEntity } from "../size/size.entity";
import { ColorEntity } from "../color/color.entity";
import { ProductEntity } from "../product/product.entity";
import { OrderEntity } from "../order/order.entity";
import { BandEntity } from "../band/band.entity";
import { BandManagerEntity } from "../bandManager/bandManager.entity";
import { GigManagerEntity } from "../gigManager/gigManager.entity";
import { CategoryEntity } from "../category/category.entity";
import { CustomerEntity } from "../customer/customer.entity";
import { DesignationEntity } from "../designation/designation.entity";

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

    user: UserProfileEntity
    token: TokenEntity
    sizes:SizeEntity[]
    colors:ColorEntity[]
    products:ProductEntity[]
    orders:OrderEntity[]
    bands:BandEntity[]
    bandManagers:BandManagerEntity[]
    gigManagers:GigManagerEntity[]
    catagories:CategoryEntity[]
    customers:CustomerEntity[]
    designations:DesignationEntity[]
}

export class LoginRegistrationDTO{
    id:string

    @IsNotEmpty({message:"Name must have a value"})
    @IsString({message:"Name must have a string"})
    @Matches(/^[A-Z][a-zA-Z ]+$/, {message:"Enter a proper name"})
    name:string

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

export class ChangePassword{
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

export class ForgetPassword{
    @IsNotEmpty({message:"New Password must have a value"})
    @Matches(/^(?=.*[@$&!_-])[A-Za-z0-9@$&!_-]{6,}$/, {message:"Enter a proper Password with length 6 with 1 special character from this set [@,$,&,!,_,-]"})
    password:string
    token:string
}