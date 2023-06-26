import { Entity, PrimaryColumn } from "typeorm";

@Entity('Product')
export class ProductEntity {

    @PrimaryColumn()
    id: string;
    // sizes: any;



}