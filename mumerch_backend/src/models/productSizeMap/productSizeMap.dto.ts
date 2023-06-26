import {IsNotEmpty} from "class-validator";
import { SizeEntity } from "../size/size.entity";
import { ProductEntity } from "../product/product.entity";

export class ProductSizeMapDTO{
    id: string
    // productId:string
    // sizeId:string

    product:ProductEntity;
    size:SizeEntity;
}

export class ProductSizeMapRegistrationDTO{
    // @IsNotEmpty()
    // productId:string
    
    @IsNotEmpty()
    // sizeId:string
    product:ProductEntity;
    size:SizeEntity;
}