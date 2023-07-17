import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { BandManagerEntity } from "../bandManager/bandManager.entity";
import { ProductEntity } from "../product/product.entity";

@Entity('Band')
export class BandEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({unique:true})
  name: string;
  @Column()
  image: string;
  @ManyToOne(()=>LoginEntity, login=>login.bands, {cascade:true})
  login:LoginEntity
  @OneToOne(()=>BandManagerEntity, bandManager=>bandManager.band)
  bandManager:BandManagerEntity
  @OneToMany(()=>ProductEntity, products=>products.band)
  products:ProductEntity[]
}