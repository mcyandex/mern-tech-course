import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Unit')
export class UnitEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name:string
}