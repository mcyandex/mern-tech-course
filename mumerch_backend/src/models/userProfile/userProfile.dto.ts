import { IsDateString, IsEmail, IsNotEmpty, IsString, Matches, MaxDate, Validate } from "class-validator";
import { ServerResponse } from "http";
import { LoginDTO } from "../login/login.dto";
import { AgeValidation } from "src/custom_auth/ageValidation";

export class UserProfileDTO {
    @IsNotEmpty({ message: "Father's Name must have a value" })
    @IsString({ message: "Father's Name must have a string" })
    @Matches(/^[A-Z][a-zA-Z ]+$/, { message: "Enter a proper Father's name" })
    fatherName: string

    @IsNotEmpty({ message: "motherName must have a value" })
    @IsString({ message: "motherName must have a string" })
    @Matches(/^[A-Z][a-zA-Z ]+$/, { message: "Enter a proper mothername" })
    motherName: string
    
    @IsDateString({},{message:"Date must in ISO Format: YYYY-MM-DD"})
    @Validate(AgeValidation)
    dateOfBirth: Date

    @IsNotEmpty({ message: "Blood Group must have a value" })
    @Matches(/^(A|B|AB|O)[+-]$/, { message: "Enter a proper Blood Group" })
    bloodGroup: string

    image: string

    nidNo: string

    address: string

    id: string
    login: LoginDTO
}