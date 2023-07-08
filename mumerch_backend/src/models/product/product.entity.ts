import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { CategoryEntity } from "../category/category.entity";
import { BandEntity } from "../band/band.entity";
import { ProductSizeMapEntity } from "../productSizeMap/productSizeMap.entity";
import { ProductColorMapEntity } from "../productColorMap/productColorMap.entity";
import { ProductOrderMapEntity } from "../productOrderMap/productOrderMap.entity";

@Entity('Product')
export class ProductEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string
  @Column()
  price:number
  @Column()
  image:string
  @Column()
  revenuePercentage:number
  @Column()
  quantity:number
  @ManyToOne(()=>LoginEntity, login=>login.products, {cascade:true})
  login:LoginEntity
  @ManyToOne(()=>CategoryEntity, category=>category.products, {cascade:true})
  category:CategoryEntity
  @ManyToOne(()=>BandEntity, band=>band.products, {cascade:true})
  band:BandEntity
  @OneToMany(()=>ProductSizeMapEntity, productSizeMaps=>productSizeMaps.size)
  productSizeMaps:ProductSizeMapEntity[]
  @OneToMany(()=>ProductColorMapEntity, productColorMaps=>productColorMaps.color)
  productColorMaps:ProductColorMapEntity[]
  @OneToMany(()=>ProductOrderMapEntity, productOrderMaps=>productOrderMaps.order)
  productOrderMaps:ProductOrderMapEntity[]
}