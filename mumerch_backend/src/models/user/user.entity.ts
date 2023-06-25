import { Collection, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { UnitEntity } from "../unit/unit.entity";

@Entity('User')
export class UserEntity {

  @PrimaryColumn()
  id: string;
  @Column()
  name:string
  @Column()
  fatherName: string
  @Column()
  motherName: string
  @Column()
  dateOfBirth: Date
  @Column()
  bloodGroup: string
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
  //@Column({unique:true})
  image: string
  @Column()
  designation: string
  @OneToMany(()=>UnitEntity, unit=>unit.user)
  units:UnitEntity[]
}
