import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { GigEntity } from "../gig/gig.entity";

@Entity('GigManager')
export class GigManagerEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=>LoginEntity, login=>login.gigManagers, {cascade:true})
  login:LoginEntity
  @OneToOne(()=>GigEntity, gig=>gig.gigManager, {cascade:true})
  @JoinColumn()
  gig:GigEntity
  @OneToOne(()=>LoginEntity, gigManager=>gigManager.gManager, {cascade:true})
  @JoinColumn()
  gigManager:LoginEntity
}