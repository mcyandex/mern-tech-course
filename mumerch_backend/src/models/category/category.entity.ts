import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { ProductEntity } from "../product/product.entity";


@Entity('Category')
export class CategoryEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({unique:true})
  name: string;
  @ManyToOne(()=>LoginEntity, login=>login.catagories, {cascade:true})
  login:LoginEntity
  @OneToMany(()=>ProductEntity, products=>products.category)
  products:ProductEntity[]

  

}