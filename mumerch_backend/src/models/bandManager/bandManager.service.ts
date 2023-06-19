import { Injectable } from "@nestjs/common";
import { BandManagerDTO } from "./bandManager.dto";

@Injectable()
export class BandManagerService {
  getBandManager(): BandManagerDTO {
    return {id:"10",bandId:"g-100",userId:"u-100"};
  }

  getBandManagerById(id: string): BandManagerDTO{
    return {id:"10",bandId:"g-100",userId:"u-100"};
  }

  updateBandManager(data: BandManagerDTO): string{
    return data.bandId+" "+data.userId;
  }

  deleteBandManager(id: string): string{
    return "-- deleted";
  }

  addBandManager(data: BandManagerDTO): string{
    return data.bandId+" "+data.userId;
  }
}