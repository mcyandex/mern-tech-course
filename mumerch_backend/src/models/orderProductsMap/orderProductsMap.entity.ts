import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "../order/order.entity";
import { ProductEntity } from "../product/product.entity";
import { ProductDetailsEntity } from "../productDetails/productDetails.entity";


@Entity('OrderProductsMap')
export class OrderProductsMapEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  orderQuantity:number
  @Column() 
  orderPrice:number
  @ManyToOne(()=>OrderEntity, order=>order.orderProducts, {cascade:true})
  order:OrderEntity
  @ManyToOne(()=>ProductDetailsEntity, productDetails=>productDetails.orderProducts, {cascade:true})
  productDetails:ProductDetailsEntity
}