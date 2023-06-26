import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity('BandManager')
export class BandManagerEntity {

  @PrimaryColumn()
  id: string;

  @OneToMany(()=>UserEntity, user=>user.bandManager)
  users:UserEntity[]


}