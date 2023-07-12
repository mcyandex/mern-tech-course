import { LoginEntity } from "../login/login.entity";

export class TokenDTO{
  id: string;
  startTime: Date
  endTime: Date
  token:string
  login: LoginEntity
}