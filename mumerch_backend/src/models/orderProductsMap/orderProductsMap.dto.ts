import { OrderDTO } from "../order/order.dto";
import { ProductDTO } from "../product/product.dto";

export class orderProductsMapDTO{
    id: string
    orderQuantity:number
    orderPrice:number
    order:OrderDTO
    product:ProductDTO
}