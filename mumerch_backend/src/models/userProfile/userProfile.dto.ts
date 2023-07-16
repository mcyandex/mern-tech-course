import { IsDateString, IsNotEmpty, IsNumber, IsString, Matches, Validate } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { AgeValidation } from "src/custom_validation/ageValidation";

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
    @IsNotEmpty({message: "NID must have a value"})
    @Matches(/^[0-9]{10}$/, { message: "NID must carry 10 digits" })
    nidNo: string
    @IsString({message: "Address must be a string"})
    @IsNotEmpty({ message: "Address must have a value" })
    address: string

    id: string
    login: LoginDTO
}