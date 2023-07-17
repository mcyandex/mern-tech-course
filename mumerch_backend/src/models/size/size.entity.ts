import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { ProductDetailsEntity } from "../productDetails/productDetails.entity";

@Entity('Size')
export class SizeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({unique:true})
  name:string
  @ManyToOne(()=>LoginEntity, login=>login.sizes, {cascade:true})
  login:LoginEntity
  @OneToMany(()=>ProductDetailsEntity, productDetails=>productDetails.size)
  productDetails:ProductDetailsEntity[]
}