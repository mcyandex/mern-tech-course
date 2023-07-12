import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SizeEntity } from "../size/size.entity";
import { ProductEntity } from "../product/product.entity";
import { ColorEntity } from "../color/color.entity";
import { OrderProductsMapEntity } from "../orderProductsMap/orderProductsMap.entity";

@Entity('ProductDetails')
export class ProductDetailsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  quantity:number
  @Column()
  name:string
  @ManyToOne(()=>ColorEntity, color=>color.productDetails, {cascade:true})
  color:ColorEntity
  @ManyToOne(()=>SizeEntity, size=>size.productDetails, {cascade:true})
  size:SizeEntity
  @ManyToOne(()=>ProductEntity, product=>product.productDetails, {cascade:true})
  product:ProductEntity
  @OneToMany(()=>OrderProductsMapEntity, orderProducts=>orderProducts.productDetails)
  orderProducts:OrderProductsMapEntity[]
}