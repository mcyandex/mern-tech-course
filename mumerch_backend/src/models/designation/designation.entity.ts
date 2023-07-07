import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";

@Entity('Designation')
export class DesignationEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToOne(()=>LoginEntity, login=>login.customers, {cascade:true})
  login:LoginEntity
}