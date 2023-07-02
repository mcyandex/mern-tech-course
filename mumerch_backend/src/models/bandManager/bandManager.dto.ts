import {IsNotEmpty} from "class-validator";

export class BandManagerDTO{
    id: string
    // bandId:string
    // userId:string
}

export class BandManagerRegistrationDTO{
    @IsNotEmpty()
    id:string
    
    // @IsNotEmpty()
    // userId:string
}