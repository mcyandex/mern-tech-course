import { Injectable } from "@nestjs/common";
import { GigManagerDTO } from "./gigManager.dto";

@Injectable()
export class GigManagerService {
  getGigManager(): GigManagerDTO {
    return {id:"10",gigId:"g-100",userId:"u-100"};
  }

  getGigManagerById(id: string): GigManagerDTO{
    return {id:"10",gigId:"g-100",userId:"u-100"};
  }

  updateGigManager(data: GigManagerDTO): string{
    return data.gigId+" "+data.userId;
  }

  deleteGigManager(id: string): string{
    return "-- deleted -- gigm";
  }

  addGigManager(data: GigManagerDTO): string{
    return data.gigId+" "+data.userId;
  }
}