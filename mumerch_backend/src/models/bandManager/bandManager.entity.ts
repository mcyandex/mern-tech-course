import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { BandEntity } from "../band/band.entity";

@Entity('BandManager')
export class BandManagerEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=>LoginEntity, login=>login.bandManagers, {cascade:true})
  login:LoginEntity
  @OneToMany(()=>BandEntity, bands=>bands.bandManager)
  bands:BandEntity
}