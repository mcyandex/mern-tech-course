import { Collection, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { UserProfileEntity } from "../userProfile/userProfile.entity";
import { SizeEntity } from "../size/size.entity";

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
  
}