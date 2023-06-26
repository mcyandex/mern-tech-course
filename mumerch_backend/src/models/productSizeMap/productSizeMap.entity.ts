import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SizeEntity } from "../size/size.entity";
import { ProductEntity } from "../product/product.entity";

@Entity('ProductSizeMap')
export class ProductSizeMapEntity {

    @PrimaryColumn()
    id: string;

    @ManyToOne(()=>SizeEntity, size=>size.product, {cascade:true})

    @JoinColumn()
    sizes:SizeEntity

    @OneToMany(()=>ProductEntity, product=>product.sizes, {cascade:true})

    product:ProductEntity[]

}