import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { ProductOrderMapEntity } from "../productOrderMap/productOrderMap.entity";

@Entity('Order')
export class OrderEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string
  @ManyToOne(()=>LoginEntity, login=>login.orders, {cascade:true})
  login:LoginEntity
  @OneToMany(()=>ProductOrderMapEntity, productOrderMaps=>productOrderMaps.order)
  productOrderMaps:ProductOrderMapEntity[]
}