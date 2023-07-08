import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
  @ManyToOne(()=>GigManagerEntity, gigManager=>gigManager.gigs, {cascade:true})
  gigManager:GigManagerEntity
  @OneToMany(()=>OrderEntity, orders=>orders.gig)
  orders:OrderEntity[]
}