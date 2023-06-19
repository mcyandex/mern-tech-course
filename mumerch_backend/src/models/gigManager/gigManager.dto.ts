import {IsNotEmpty} from "class-validator";

export class GigManagerDTO{
    id: string
    gigId:string
    userId:string
}

export class GigManagerRegistrationDTO{
    @IsNotEmpty()
    gigId:string
    
    @IsNotEmpty()
    userId:string
}