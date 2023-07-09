import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ColorEntity } from "../color/color.entity";
import { ProductEntity } from "../product/product.entity";

@Entity('ProductColorMap')
export class ProductColorMapEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  quantity:number
  @ManyToOne(()=>ColorEntity, color=>color.productColorMaps, {cascade:true})
  color:ColorEntity
  @ManyToOne(()=>ProductEntity, product=>product.productColorsMap, {cascade:true})
  product:ProductEntity
}