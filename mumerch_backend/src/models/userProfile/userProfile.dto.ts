import { IsDateString, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { ServerResponse } from "http";

export class UserProfileDTO {
    @IsNotEmpty({ message: "Father's Name must have a value" })
    @IsString({ message: "Father's Name must have a string" })
    @Matches(/^[A-Z][a-zA-Z ]+$/, { message: "Enter a proper Father's name" })
    fatherName: string

    @IsNotEmpty({ message: "motherName must have a value" })
    @IsString({ message: "motherName must have a string" })
    @Matches(/^[A-Z][a-zA-Z ]+$/, { message: "Enter a proper mothername" })
    motherName: string

    @IsDateString()
    dateOfBirth: Date

    @IsNotEmpty({ message: "Blood Group must have a value" })
    @Matches(/^(A|B|AB|O)[+-]$/, { message: "Enter a proper Blood Group" })
    bloodGroup: string

    image: string

    nidNo: string

    address: string

    id: string
}