import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { BandManagerEntity } from "../bandManager/bandManager.entity";
import { ProductEntity } from "../product/product.entity";

@Entity('Band')
export class BandEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  image: string;
  @ManyToOne(()=>LoginEntity, login=>login.bands, {cascade:true})
  login:LoginEntity
  @ManyToOne(()=>BandManagerEntity, bandManager=>bandManager.bands, {cascade:true})
  bandManager:BandManagerEntity
  @OneToMany(()=>ProductEntity, products=>products.band)
  products:ProductEntity[]
}