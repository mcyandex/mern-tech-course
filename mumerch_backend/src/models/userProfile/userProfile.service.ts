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
  getUserProfile(): Promise<UserProfileEntity[]> {
    return this.userProfileRepo.find();
  }
  getUserProfileById(id: string): Promise<UserProfileEntity> {
    return this.userProfileRepo.findOneBy({ id: id })
  }
  getUserProfileByLoginInfo(id:string):Promise<UserProfileEntity>{
    return this.userProfileRepo.findOne({
      where:{
        login:{id:id}
      },
      relations:{
        login:true
      }
    })
  }
  async updateUserProfile(id:string, data: UserProfileDTO): Promise<UserProfileEntity> {
    await this.userProfileRepo.update(id, data)
    return await this.userProfileRepo.findOneBy({ id: id })
  }
  deleteUserProfile(id: string): Promise<DeleteResult> {
    return this.userProfileRepo.delete(id);
  }
  addUserProfile(data: UserProfileDTO): Promise<UserProfileEntity> {
    return this.userProfileRepo.save(data);
  }
}