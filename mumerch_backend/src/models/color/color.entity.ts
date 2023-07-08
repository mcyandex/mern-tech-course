import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { ProductColorMapEntity } from "../productColorMap/productColorMap.entity";

@Entity('Color')
export class ColorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string
  @Column()
  colorCode: string
  @ManyToOne(()=>LoginEntity, login=>login.colors, {cascade:true})
  login:LoginEntity
  @OneToMany(()=>ProductColorMapEntity, productColorMaps=>productColorMaps.color)
  productColorMaps:ProductColorMapEntity[]
}