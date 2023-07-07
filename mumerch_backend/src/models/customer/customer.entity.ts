import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";

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
    @Column()
    address: string
    @Column()
    updatedAt: Date
    @ManyToOne(()=>LoginEntity, login=>login.customers, {cascade:true})
    login:LoginEntity
}