import {IsNotEmpty} from "class-validator";
import { LoginEntity } from "../login/login.entity";
import { GigEntity } from "../gig/gig.entity";

export class GigManagerDTO{
  id: string;
  login:LoginEntity
  @IsNotEmpty({ message: "Gig Id required" })
  gig:GigEntity
  @IsNotEmpty({ message: "Gig Manager Id required" })
  gigManager:LoginEntity
}