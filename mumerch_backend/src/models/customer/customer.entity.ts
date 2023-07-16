import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { OrderEntity } from "../order/order.entity";

@Entity('Customer')
export class CustomerEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string
    @Column()
    email: string
    @Column()
    phoneNo: string
    @ManyToOne(()=>LoginEntity, login=>login.customers, {cascade:true, nullable:true})
    login:LoginEntity
    @OneToMany(() => OrderEntity, orders => orders.customer)
    orders: OrderEntity[]
}