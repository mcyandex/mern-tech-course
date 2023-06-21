import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Unit')
export class UnitEntity {

  @PrimaryColumn()
  id: string;
  @Column()
  name:string
  @Column()
  updatedBy:string

}