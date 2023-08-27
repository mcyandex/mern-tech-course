import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductDTO } from './product.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
  ) { }
  async findLastProductId(): Promise<string> {
    try {
      const entity = await this.productRepo.find({
        select: ["id"],
        order: {
          id: 'DESC',
        },
        take: 1,
      });
      let newIdCount: string;

      if (entity && entity.length > 0) {
        const lastId = entity[0].id;
        const parts = lastId.split('-');
        const lastPart = parts[parts.length - 1];
        const count = parseInt(lastPart);
        if (!isNaN(count)) {
          const incrementedCount = count + 1;
          newIdCount = incrementedCount.toString().padStart(4, '0');
        }
      }
      else {
        newIdCount = `0001`;
      }
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString().substr(-2);
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const newId = `MP-${month}${year}-${newIdCount}`;
      return newId;
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve the last Id');
    }
  }
  getProduct(): Promise<ProductEntity[]> {
    return this.productRepo.find({
      select: {
        name: true,
        id: true
      }
    });
  }
  getProductWithDetails(): Promise<ProductEntity[]> {
    return this.productRepo.find({
      relations: {
        productDetails: {
          size: true,
          color: true
        }
      }
    });
  }
  getProductById(id: string): Promise<ProductEntity> {
    return this.productRepo.findOneBy({ id: id });
  }
  getProductByIdWithAllInfo(id: string): Promise<ProductEntity> {
    return this.productRepo.findOne(
      {
        where: {
          id:id
        },
        relations:{
          productDetails:{
            size:true,
            color:true
          }
        }
      });
  }
  async getProductByName(name: string): Promise<ProductEntity[]> {

    return await this.productRepo.find({
      where: {
        name: ILike(`${name}`)
      },
      relations: {
        band: true,
        category: true
      }
    })
  }
  getProductByBandId(bandId: string): Promise<ProductEntity> {
    return this.productRepo.findOne({
      where: {
        band: {
          id: bandId
        }
      },
      relations: {
        band: true,
      }
    });
  }
  async updateProduct(id: string, data: ProductEntity): Promise<ProductDTO> {
    await this.productRepo.update(id, data)
    return await this.productRepo.findOneBy({ id: id })
  }
  deleteProduct(id: string): Promise<DeleteResult> {
    return this.productRepo.delete(id);
  }
  addProduct(data: ProductDTO): Promise<ProductEntity> {
    return this.productRepo.save(data);
  }
}