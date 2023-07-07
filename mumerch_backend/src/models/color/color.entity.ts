import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";

@Entity('Color')
export class ColorEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name:string
  @Column()
  colorCode: string
  @ManyToOne(()=>LoginEntity, login=>login.colors, {cascade:true})
  login:LoginEntity
}