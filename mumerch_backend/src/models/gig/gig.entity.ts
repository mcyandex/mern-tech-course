import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { GigManagerEntity } from "../gigManager/gigManager.entity";
import { OrderEntity } from "../order/order.entity";

@Entity('Gig')
export class GigEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToOne(()=>LoginEntity, login=>login.bands, {cascade:true})
  login:LoginEntity
  @OneToOne(()=>GigManagerEntity, gigManager=>gigManager.gig)
  gigManager:GigManagerEntity
  @OneToMany(()=>OrderEntity, orders=>orders.gig)
  orders:OrderEntity[]
}