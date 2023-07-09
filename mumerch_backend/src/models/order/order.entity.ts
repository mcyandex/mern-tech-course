import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";
import { GigEntity } from "../gig/gig.entity";
import { OrderProductsMapEntity } from "../orderProductsMap/orderProductsMap.entity";

@Entity('Order')
export class OrderEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string
  @Column()
  date: string;
  @ManyToOne(() => LoginEntity, login => login.orders, { cascade: true })
  login: LoginEntity
  @OneToMany(() => OrderProductsMapEntity, orderProducts => orderProducts.order)
  orderProducts: OrderProductsMapEntity[]
  @ManyToOne(() => GigEntity, gig => gig.orders, { cascade: true })
  gig: GigEntity
}