import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('Sizes')
export class SizeEntity {

    @PrimaryColumn()
    id: string;
    // product: any;

    



}