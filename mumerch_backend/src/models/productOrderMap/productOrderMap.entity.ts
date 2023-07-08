import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "../order/order.entity";
import { ProductEntity } from "../product/product.entity";


@Entity('ProductOrderMap')
export class ProductOrderMapEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=>OrderEntity, order=>order.productOrderMaps, {cascade:true})
  order:OrderEntity
  @ManyToOne(()=>ProductEntity, product=>product.productOrderMaps, {cascade:true})
  product:ProductEntity
}