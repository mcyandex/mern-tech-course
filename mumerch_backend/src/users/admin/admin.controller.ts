
import { BadRequestException, Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Session, Delete, NotFoundException } from "@nestjs/common";
import { SizeDTO } from "src/models/size/size.dto";
import { SizeService } from "src/models/size/size.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { DesignationDTO } from "src/models/designation/designation.dto";
import { DesignationService } from "src/models/designation/designation.service";
import { ColorDTO } from "src/models/color/color.dto";
import { ColorService } from "src/models/color/color.service";
import { CategoryDTO } from "src/models/category/category.dto";
import { CategoryService } from "src/models/category/category.service";
import { BandDTO } from "src/models/band/band.dto";
import { BandService } from "src/models/band/band.service";
import * as fs from 'fs-extra';
import * as bcrypt from 'bcrypt';
import { UserProfileDTO } from "src/models/userProfile/userProfile.dto";
import { LoginDTO, LoginRegistrationDTO } from "src/models/login/login.dto";
import { LoginService } from "src/models/login/login.service";
import { SessionAdminGuard } from "./SessionAdminGaurd.gaurd";
import { DeleteResult } from "typeorm";
import session from "express-session";
import { UserProfileService } from "src/models/userProfile/userProfile.service";

@Controller('admin')
//@UseGuards(SessionAdminGuard)
export class AdminController {
  constructor(
    private readonly sizeService: SizeService,
    private readonly designationService: DesignationService,
    private readonly colorService: ColorService,
    private readonly categoryService: CategoryService,
    private readonly bandService: BandService,
    private readonly loginService: LoginService,
    private readonly userProfileService: UserProfileService
  ) { }

  //Size CRUD part
  @Get('getsize')
  getSize(): Promise<SizeDTO[]> {
    return this.sizeService.getSize();
  }

  @Get('getsize/:name')
  getSizeByName(@Param() name: string): Promise<SizeDTO[]> {
    return this.sizeService.getSizeByName(name);
  }

  @Post('addsize')
  async addSize(@Body() data: SizeDTO): Promise<SizeDTO> {
    //data.login = await this.loginService.getUserLoginInfoById(session.user.id)
    return this.sizeService.addSize(data);
  }

  @Delete('deletesize/:id')
  async deleteSize(@Param('id') id: string): Promise<string>{
    const res = await this.sizeService.deleteSize(id);
    if(res['affected']>0){
      return "ID: "+id+" deleted successfully"
    }
    return "ID: "+id+" couldnot delete, something went wrong"
  }

  @Put('updatesize/:id')
  updateSize(@Param('id') id: string, @Body() data: SizeDTO): Promise<SizeDTO> {
    return this.sizeService.updateSize(id, data);
  }

  @Get('getallsizesbyadmin')
  getAllSizesByAdminId(@Session() session){
    return this.sizeService.getAllSizeByUserId(session.user.id)
  }

  @Get('updatesizebyadmin/:id')
  updateSizeByAdminId(@Session() session, @Param('id') id:string){
    return this.sizeService.getSizeByUserId(session.user.id, id)
  }
  
  @Get('getallsizesbyuid')
  getAllSizesByUid(@Session() session){
    return this.sizeService.getAllSizeByUserId(session.user.id)
  }

  @Get('getsizebyuid/:id')
  getSizeByUid(@Session() session, @Param('id') id:string){
    return this.sizeService.getSizeByUserId(session.user.id, id)
  }

  @Delete('deletesizebyuid/:id')
  async deleteSizeByUid(@Param('id') id: string, @Session() session): Promise<string>{
    const specSize = await this.sizeService.getSizeByUserId(session.user.id, id)
    const res = await this.sizeService.deleteSize(specSize.id);
    if(res['affected']>0){
      return "ID: "+id+" deleted successfully"
    }
    return "ID: "+id+" couldnot delete, something went wrong"
  }

  @Put('updatesizebyuid/:sid')
  async updateSizeByUid(@Param('sid') sid: string, @Session() session, @Body() data:SizeDTO): Promise<SizeDTO>{
    const specSize = await this.sizeService.getSizeByUserId(session.user.id, sid)
    if(specSize==null){
      throw new NotFoundException('Size not found')
    }
    return await this.sizeService.updateSize(specSize.id, data);
  }
  // @Delete('deletesizebyadminid/:id')
  // async deleteSizeByAdminId(@Param('id') id:string, @Session() session):Promise<string>{
    
  // }

  // Color CRUD part
  @Get('getcolor')
  getColor(): ColorDTO {
    return this.colorService.getColor();
  }

  @Post('addcolor')
  addColor(@Body() data: ColorDTO): string {
    return this.colorService.addColor(data);
  }

  @Get('deletecolor/:id')
  deleteColor(@Param() id: string): string {
    return this.colorService.deleteColor(id);
  }

  @Put('updatecolor')
  updateColor(@Body() data: ColorDTO): string {
    return this.colorService.updateColor(data);
  }

  // Category CRUD operation

  @Get('getcategory')
  getCategory(@Body() data: CategoryDTO): string {
    return this.categoryService.getCategory(data);
  }

  @Post('addcategory')
  addCategory(@Body() data: CategoryDTO): string {
    return this.categoryService.addCategory(data);
  }

  @Get('deletecategory/:id')
  deleteCategory(@Param() id: string): string {
    return this.categoryService.deleteCategory(id);
  }

  @Put('updatecategory')
  updateCategory(@Body() data: CategoryDTO): string {
    return this.categoryService.updateCategory(data);
  }

  // Band's CRUD OPERATION
  @Get('getband')
  getBand(@Body() data: BandDTO): string {
    return this.bandService.getBand();
  }

  @Get('getband/:id')
  getBandById(@Param() id: string): string {
    return this.bandService.getBandById(id);
  }

  @Post('addband')
  addBand(@Body() data: BandDTO): string {
    return this.bandService.addBand(data);
  }

  @Get('deleteband/:id')
  deleteBand(@Param() id: string): string {
    return this.bandService.deleteBand(id);
  }

  @Put('updateband')
  updateBand(@Body() data: BandDTO): string {
    return this.bandService.updateBand(data);
  }

  //Login info section
  @Post('adduserprofile')
  @UsePipes(new ValidationPipe())
  async addUser(@Body() data: LoginRegistrationDTO): Promise<LoginRegistrationDTO> {
    const lastID = await this.loginService.findLastUserLoginId();
    const password = Date.now() + '$'
    console.log(password)
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(password, salt);

    data.id = lastID
    data.password = hassedpassed
    return this.loginService.addUserLoginInfo(data);
  }

  // @Put('updateuser')
  // @UsePipes(new ValidationPipe())
  // updateUserLoginInfo(@Body() data:LoginRegistrationDTO):Promise<LoginDTO>{

  // }
  
  @Get('getalluserslogininfo')
  getAllUsersLoginInfo():Promise<LoginDTO[]>{
    return this.loginService.getUserLoginInfo()
  }

  //UserProfile Registration section
  @Post('adduserprofile')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 8000000 },
      storage: diskStorage({
        destination: './temp/users',
        filename: function (req, file, cb) {
          let name = req.body.name;
          console.log(name);
          cb(null, `${name}.${file.originalname.split('.')[1]}`);
        },
      }),
    })
  )
  async addUserProfile(
    @UploadedFile() myfileobj: Express.Multer.File,
    @Body() data: UserProfileDTO, @Session() session): Promise<UserProfileDTO> {
      if (!myfileobj || myfileobj.size == 0) {
        throw new BadRequestException('Empty file');
      }
      const newFileName = `${session.user.id}.${myfileobj.originalname.split('.')[1]}`;

      const destinationDir = './uploads/users';
      const filePath = `${destinationDir}/${newFileName}`;

      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }
      await fs.promises.rename(myfileobj.path, filePath);
      return this.userProfileService.addUserProfile(data);
  }

  //update
  //--->param:id, no file empty validation, direct update

  // @Get('/getuser')
  // async getAllUsers(): Promise<UserProfileDTO[]> {
  //   const users = await this.userService.getUser();
  //   return users;
  // }

  //Designation CRUD part
  @Get('getdesignation')
  getDesignation(): DesignationDTO {
    return this.designationService.getDesignation();
  }

  @Get('getdesignation/:name')
  getDesignationByName(@Param() name: string): DesignationDTO {
    return this.designationService.getDesignationByName(name);
  }

  @Post('adddesignation')
  addDesignation(@Body() data: DesignationDTO): string {
    return this.designationService.addDesignation(data);
  }

  @Get('deletedesignation/:id')
  deleteDesignation(@Param() id: string): string {
    return this.designationService.deleteDesignation(id);
  }

  @Put('updatedesignation')
  updateDesignation(@Body() data: DesignationDTO): string {
    return this.designationService.updateDesignation(data);
  }
}