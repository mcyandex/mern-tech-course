import { Injectable } from "@nestjs/common";
import { GigDTO } from "./gig.dto";


@Injectable()
export class GigService {
  //getGig(): GigDTO {
  getGig(): string {
    return "--------------- List of Gig ---------------";
  }

  //getGigById(Id: string): GigDTO{
  getGigById(id: string): string{
    return "Specific Gig fot ID: "+id;
  }

  updateGig(data: GigDTO): string{
    return "Gig updated";
  }

  deleteGig(id: string): string{
    return "-- deleted";
  }

  addGig(data: GigDTO): string{
    return "Gig added";
  }
}