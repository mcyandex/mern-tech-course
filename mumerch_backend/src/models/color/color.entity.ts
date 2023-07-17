import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { ProductDetailsEntity } from "../productDetails/productDetails.entity";

@Entity('Color')
export class ColorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string
  @Column({unique:true})
  colorCode: string
  @ManyToOne(()=>LoginEntity, login=>login.colors, {cascade:true})
  login:LoginEntity
  @OneToMany(()=>ProductDetailsEntity, productDetails=>productDetails.color)
  productDetails:ProductDetailsEntity[]
}