import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";

@Entity('Size')
export class SizeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string
  @ManyToOne(()=>LoginEntity, login=>login.sizes, {cascade:true})
  login:LoginEntity
}