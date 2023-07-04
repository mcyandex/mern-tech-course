import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfileEntity } from "./userProfile.entity";
import { DeleteResult, Repository } from "typeorm";
import { UserProfileDTO } from "./userProfile.dto";

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfileEntity) private userProfileRepo: Repository<UserProfileEntity>
  ) { }
  getUserProfile(): Promise<UserProfileDTO[]> {
    return this.userProfileRepo.find();
  }
  getUserProfileById(id: string): Promise<UserProfileDTO> {
    return this.userProfileRepo.findOneBy({ id: id })
  }
  async updateUserProfile(qry: any, data: UserProfileDTO): Promise<UserProfileDTO> {
    await this.userProfileRepo.update(qry.id, data)
    return await this.userProfileRepo.findOneBy({ id: qry.id })
  }
  deleteUserProfile(id: string): Promise<DeleteResult> {
    return this.userProfileRepo.delete(id);
  }
  addUserProfile(data: UserProfileDTO): Promise<UserProfileDTO> {
    return this.userProfileRepo.save(data);
  }
}