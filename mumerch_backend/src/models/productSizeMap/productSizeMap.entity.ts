import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SizeEntity } from "../size/size.entity";
import { ProductEntity } from "../product/product.entity";


@Entity('ProductSizeMap')
export class ProductSizeMapEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=>SizeEntity, size=>size.productSizeMaps, {cascade:true})
  size:SizeEntity
  @ManyToOne(()=>ProductEntity, product=>product.productSizesMap, {cascade:true})
  product:ProductEntity
}