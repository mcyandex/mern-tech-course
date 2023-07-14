import { BadRequestException } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, IsDateString, IsEmpty, IsNotEmpty, isDateString, IsDate } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class AgeValidation implements ValidatorConstraintInterface {
  validate(value: Date, args: ValidationArguments) {
    const dob = new Date(value).getFullYear()
    const today = new Date().getFullYear()
    const age = today - dob
    console.log(dob, today, age)
    if (age < 18) {
      throw new BadRequestException({ message: "Age must be greater than 18" })
    }
    return true
  }
}