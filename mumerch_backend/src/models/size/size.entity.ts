import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { ProductSizeMapEntity } from "../productSizeMap/productSizeMap.entity";

@Entity('Size')
export class SizeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string
  @ManyToOne(()=>LoginEntity, login=>login.sizes, {cascade:true})
  login:LoginEntity
  @OneToMany(()=>ProductSizeMapEntity, productSizeMaps=>productSizeMaps.size)
  productSizeMaps:ProductSizeMapEntity[]
}