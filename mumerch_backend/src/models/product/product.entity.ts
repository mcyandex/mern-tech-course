import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { CategoryEntity } from "../category/category.entity";
import { BandEntity } from "../band/band.entity";
import { OrderProductsMapEntity } from "../orderProductsMap/orderProductsMap.entity";
import { ProductDetailsEntity } from "../productDetails/productDetails.entity";

@Entity('Product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({unique:true})
  name:string
  @Column()
  price:number
  @Column()
  revenuePercentage:number
  @ManyToOne(()=>LoginEntity, login=>login.products, {cascade:true, nullable:true})
  login:LoginEntity
  @ManyToOne(()=>CategoryEntity, category=>category.products, {cascade:true})
  category:CategoryEntity
  @ManyToOne(()=>BandEntity, band=>band.products, {cascade:true})
  band:BandEntity
  @OneToMany(()=>ProductDetailsEntity, productDetails=>productDetails.product)
  productDetails:ProductDetailsEntity[]
}