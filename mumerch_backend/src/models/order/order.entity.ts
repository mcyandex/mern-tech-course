import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { ProductOrderMapEntity } from "../productOrderMap/productOrderMap.entity";
import { GigEntity } from "../gig/gig.entity";

@Entity('Order')
export class OrderEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string
  @Column()
  orderPrice: number;
  @Column()
  orderQuantity: number;
  @Column()
  date: string;
  @ManyToOne(() => LoginEntity, login => login.orders, { cascade: true })
  login: LoginEntity
  @OneToMany(() => ProductOrderMapEntity, productOrderMaps => productOrderMaps.order)
  productOrderMaps: ProductOrderMapEntity[]
  @ManyToOne(() => GigEntity, gig => gig.orders, { cascade: true })
  gig: GigEntity
}