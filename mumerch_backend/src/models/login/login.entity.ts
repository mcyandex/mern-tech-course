import { Collection, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { UserProfileEntity } from "../userProfile/userProfile.entity";
import { SizeEntity } from "../size/size.entity";
import { ColorEntity } from "../color/color.entity";
import { ProductEntity } from "../product/product.entity";
import { OrderEntity } from "../order/order.entity";
import { CustomerEntity } from "../customer/customer.entity";

@Entity('Login')
export class LoginEntity {

  @PrimaryColumn()
  id: string;
  @Column()
  name:string
  @Column()
  password: string
  @Column()
  userType: string
  @Column()
  //@Column({unique:true})
  email: string
  @Column()
  //@Column({unique:true})
  phoneNumber: string
  @Column()
  designation: string
  @OneToOne(() => UserProfileEntity, user => user.login)
  user: UserProfileEntity;
  @OneToMany(()=>SizeEntity, sizes=>sizes.login)
  sizes:SizeEntity[]
  @OneToMany(()=>ColorEntity, colors=>colors.login)
  colors:ColorEntity[]
  @OneToMany(()=>ProductEntity, products=>products.login)
  products:ProductEntity[]
  @OneToMany(()=>OrderEntity, orders=>orders.login)
  orders:OrderEntity[]
  @OneToMany(()=>CustomerEntity, customers=>customers.login)
  customers:CustomerEntity[]
}