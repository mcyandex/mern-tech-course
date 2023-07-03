import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";

@Entity('Product')
export class ProductEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string
  @ManyToOne(()=>LoginEntity, login=>login.products, {cascade:true})
  login:LoginEntity
}