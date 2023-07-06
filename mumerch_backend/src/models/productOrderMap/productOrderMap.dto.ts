import { OrderDTO } from "../order/order.dto";
import { ProductDTO } from "../product/product.dto";

export class ProductSizeMapDTO{
    id: string
    order:OrderDTO
    product:ProductDTO
}