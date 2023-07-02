import { Injectable } from "@nestjs/common";
import { BandManagerDTO } from "./bandManager.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class BandManagerService {
  // getBandManager(): BandManagerDTO {
  //   return {id:"10",bandId:"g-100",userId:"u-100"};
  // }

  // getBandManagerById(id: string): BandManagerDTO{
  //   return {id:"10",bandId:"g-100",userId:"u-100"};
  // }

  // updateBandManager(data: BandManagerDTO): string{
  //   return data.bandId+" "+data.userId;
  // }

  // deleteBandManager(id: string): string{
  //   return "-- deleted";
  // }

  // addBandManager(data: BandManagerDTO): string{
  //   return data.bandId+" "+data.userId;


  constructor(
    //@InjectRepository(BandManagerEntity) private bandManagerRepo: Repository<BandManagerEntity>,
  ) {}

  // async updateBandManager(qry:any, data: BandManagerDTO): Promise<BandManagerDTO> {
  //   await this.bandManagerRepo.update(qry.id, data)
  //   return await this.bandManagerRepo.findOneBy({id:qry.id})
  // }
  // async deleteBandManager(id: string): Promise<DeleteResult> {
  //   return await this.bandManagerRepo.delete(id);
  // }
  // async addBandManager(data: BandManagerEntity): Promise<BandManagerDTO> {
  //   return await this.bandManagerRepo.save(data);
  // }


  }
