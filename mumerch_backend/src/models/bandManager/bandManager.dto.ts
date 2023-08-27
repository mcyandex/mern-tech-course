import { IsNotEmpty } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { LoginEntity } from "../login/login.entity";
import { BandEntity } from "../band/band.entity";

export class BandManagerDTO {
  id: string
  login: LoginEntity
  band: BandEntity
  bandManager: LoginEntity
}