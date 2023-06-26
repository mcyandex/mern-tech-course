import {IsNotEmpty} from "class-validator";
import { UserEntity } from "../user/user.entity";

export class BandManagerDTO{
    id: string
    // bandId:string
    // userId:string
    user:UserEntity;
}

export class BandManagerRegistrationDTO{
    @IsNotEmpty()
    // bandId:string
    
    // @IsNotEmpty()
    // userId:string
    user:UserEntity;
}