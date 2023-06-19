import {IsNotEmpty} from "class-validator";

export class ProductSizeMapDTO{
    id: string
    productId:string
    sizeId:string
}

export class ProductSizeMapRegistrationDTO{
    @IsNotEmpty()
    productId:string
    
    @IsNotEmpty()
    sizeId:string
}