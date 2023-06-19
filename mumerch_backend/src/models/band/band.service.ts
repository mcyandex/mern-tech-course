import { Injectable } from "@nestjs/common";
import { BandDTO } from "./band.dto";


@Injectable()
export class BandService {
  //getBand(): BandDTO {
  getBand(): string {
    return "--------------- List of Band ---------------";
  }

  //getBandById(Id: string): BandDTO{
  getBandById(id: string): string{
    return "Specific Band fot ID: "+id;
  }

  updateBand(data: BandDTO): string{
    return "Band updated";
  }

  deleteBand(id: string): string{
    return "-- deleted";
  }

  addBand(data: BandDTO): string{
    return "Band added";
  }
}