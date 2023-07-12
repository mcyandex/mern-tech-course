import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoginEntity } from "../login/login.entity";

@Entity('Token')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  token:string
  @Column()
  startTime: Date
  @Column()
  endTime: Date
  @OneToOne(() => LoginEntity, login => login.token, {cascade:true})
  @JoinColumn()
  login: LoginEntity
}