import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { CategoryEntity } from "../category/category.entity";
import { BandEntity } from "../band/band.entity";

@Entity('Product')
export class ProductEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string
  @ManyToOne(()=>LoginEntity, login=>login.products, {cascade:true})
  login:LoginEntity
  @ManyToOne(()=>CategoryEntity, category=>category.products, {cascade:true})
  category:CategoryEntity
  @ManyToOne(()=>BandEntity, band=>band.products, {cascade:true})
  band:BandEntity
}