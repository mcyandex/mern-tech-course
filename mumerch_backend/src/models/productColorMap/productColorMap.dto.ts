import { ColorDTO } from "../color/color.dto";
import { ProductDTO } from "../product/product.dto";

export class ProductSizeMapDTO{
    id: string
    color:ColorDTO
    product:ProductDTO
}