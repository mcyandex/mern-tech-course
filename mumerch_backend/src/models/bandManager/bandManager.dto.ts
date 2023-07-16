import { IsNotEmpty } from "class-validator";
import { LoginDTO } from "../login/login.dto";
import { LoginEntity } from "../login/login.entity";
import { BandEntity } from "../band/band.entity";

export class BandManagerDTO {
  id: string
  login: LoginEntity
  @IsNotEmpty({ message: "Band Id required" })
  band: BandEntity
  @IsNotEmpty({ message: "Band Manager Id required" })
  bandManager: BandEntity
}
export class BandManagerRegistrationDTO {
  id: string
  login: LoginEntity
  @IsNotEmpty({ message: "Band Id required" })
  band: BandEntity
  @IsNotEmpty({ message: "Band Manager Id required" })
  bandManager: BandEntity
}