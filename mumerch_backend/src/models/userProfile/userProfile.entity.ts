import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";

@Entity('User')
export class UserProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  fatherName: string
  @Column()
  motherName: string
  @Column()
  dateOfBirth: Date
  @Column()
  bloodGroup: string
  @Column()
  image: string
  @Column()
  nidNo: string
  @Column()
  address: string
  @OneToOne(() => LoginEntity, login => login.user, {cascade:true})
  @JoinColumn()
  login: LoginEntity;
}
