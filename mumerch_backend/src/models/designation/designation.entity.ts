import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";

@Entity('Designation')
export class DesignationEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({unique:true})
  name: string;
  @OneToMany(()=>LoginEntity, login=>login.designation, {nullable:true})
  login:LoginEntity[]
  @ManyToOne(()=>LoginEntity, updater=>updater.des_creator, {cascade:true})
  updater:LoginEntity
}