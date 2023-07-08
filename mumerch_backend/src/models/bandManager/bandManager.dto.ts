import {IsNotEmpty} from "class-validator";
import { LoginDTO } from "../login/login.dto";

export class BandManagerDTO{
    id: string
    // bandId:string
    // userId:string
    login:LoginDTO

}


export class BandManagerRegistrationDTO{
    @IsNotEmpty()
    id:string
    login:LoginDTO
    
    // @IsNotEmpty()
    // userId:string
}