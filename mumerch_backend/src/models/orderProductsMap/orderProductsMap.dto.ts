import { IsNotEmpty, IsPositive } from "class-validator";
import { OrderDTO } from "../order/order.dto";
import { ProductDTO } from "../product/product.dto";

export class orderProductsMapDTO {
    id: string
    @IsNotEmpty({ message: "Order quantity must have a value" })
    @IsPositive()
    orderQuantity: number

    @IsNotEmpty({ message: "Order price must have a value" })
    @IsPositive()
    orderPrice: number
    @IsNotEmpty()
    order: OrderDTO
    @IsNotEmpty()
    product: ProductDTO
}