import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { GigEntity } from "../gig/gig.entity";

@Entity('GigManager')
export class GigManagerEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=>LoginEntity, login=>login.gigManagers, {cascade:true})
  login:LoginEntity
  @OneToMany(()=>GigEntity, gigs=>gigs.gigManager)
  gigs:GigEntity[]
}