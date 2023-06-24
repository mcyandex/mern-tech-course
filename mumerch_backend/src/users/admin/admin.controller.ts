
import { BadRequestException, Body, Controller, Delete, Get, Module, Param, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { UnitService } from "src/models/unit/unit.service";
import { SizeDTO } from "src/models/size/size.dto";
import { SizeService } from "src/models/size/size.service";
import { UserService } from "src/models/user/user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { DepartmentDTO } from "src/models/department/department.dto";
import { DepartmentService } from "src/models/department/department.service";
import { DesignationDTO } from "src/models/designation/designation.dto";
import { DesignationService } from "src/models/designation/designation.service";
import { DivisionDTO } from "src/models/division/division.dto";
import { DivisionService } from "src/models/division/division.service";
import { ColorDTO } from "src/models/color/color.dto";
import { ColorService } from "src/models/color/color.service";
import { CategoryDTO } from "src/models/category/category.dto";
import { CategoryService } from "src/models/category/category.service";
import { BandDTO } from "src/models/band/band.dto";
import { BandService } from "src/models/band/band.service";
import { UnitDTO, UnitRegistrationDTO } from "src/models/unit/unit.dto";
import * as fs from 'fs-extra';
import { UserDTO } from "src/models/user/user.dto";
import { promises } from "dns";
import { UnitEntity } from "src/models/unit/unit.entity";
import { UserEntity } from "src/models/user/user.entity";

@Controller('admin')
export class AdminController {
  constructor(
    private readonly unitService: UnitService,
    private readonly sizeService: SizeService,
    private readonly departmentService: DepartmentService,
    private readonly designationService: DesignationService,
    private readonly divisionService: DivisionService,
    private readonly colorService: ColorService,
    private readonly categoryService: CategoryService,
    private readonly bandService: BandService,
    private readonly userService: UserService
  ) { }

  //Size CRUD part
  @Get('getsize')
  getSize(): SizeDTO {
    return this.sizeService.getSize();
  }

  @Get('getsize/:name')
  getSizeByName(@Param() name: string): SizeDTO {
    return this.sizeService.getSizeByName(name);
  }

  @Post('addsize')
  addSize(@Body() data: SizeDTO): string {
    return this.sizeService.addSize(data);
  }

  @Get('deletesize/:id')
  deleteSize(@Param() id: string): string {
    return this.sizeService.deleteSize(id);
  }

  @Put('updatesize')
  updateSize(@Body() data: SizeDTO): string {
    return this.sizeService.updateSize(data);
  }

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

  //Unit CRUD part
  //@Get('getunit')
  // getUnit(): Promise<string> {
  //   return this.unitService.addUnit();
  // }

  // @Get('getunit/:name')
  // getUnitByName(@Param() name: string): UnitDTO {
  //   return this.unitService.getUnitByName(name);
  // }

  @Post('addunit/:userId')
  async addUnit(@Body() data: UnitEntity, @Param('id') userId:string): Promise<any> {
    const user = await this.userService.getUserById(userId)
    console.log(user)
    data.user = user
    return this.unitService.addUnit(data);
  }

  // @Get('deleteunit/:id')
  // deleteUnit(@Param() id: string): string {
  //   return this.unitService.deleteUnit(id);
  // }

  // @Put('updateunit')
  // updateUnit(@Body() data: UnitDTO): string {
  //   return this.unitService.updateUnit(data);
  // }

  //User Registration section
  @Post('adduser')
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
        destination: './temp/user',
        filename: function (req, file, cb) {
          let name = req.body.username;
          console.log(name);
          cb(null, `${name}.${file.originalname.split('.')[1]}`);
        },
      }),
    })
  )
  async addUser(
    @UploadedFile(new ValidationPipe()) myfileobj: Express.Multer.File,
    @Body(new ValidationPipe()) data: UserDTO): Promise<UserDTO> {
    try {
      const lastID = await this.userService.findLastUserId();
      const newFileName = `${lastID}.${myfileobj.originalname.split('.')[1]}`;

      data.id = lastID
      data.image = newFileName

      const filePath = `./uploads/users/${newFileName}`;
      await fs.promises.rename(myfileobj.path, filePath);

      myfileobj.originalname = newFileName;
      myfileobj.filename = newFileName;
      myfileobj.path = filePath;

      console.log(myfileobj);
      return this.userService.addUser(data);
    }
    catch (error) {
      throw new Error('Failed to add user.');
    }
  }

  @Get('/getuser')
  async getAllUsers(): Promise<UserDTO[]> {
    return this.userService.getAllUsers();;
  }

  @Get('/getuserbyid/:id')
  async getUserById(@Param('id') id:string): Promise<UserEntity> {
    console.log(id)
    return this.userService.getUserById(id);
  }


  //Department CRUD part
  @Get('getdepartment')
  getDepartment(): DepartmentDTO {
    return this.departmentService.getDepartment();
  }

  @Get('getdepartment/:name')
  getDepartmentByName(@Param() name: string): DepartmentDTO {
    return this.departmentService.getDepartmentByName(name);
  }

  @Post('adddepartment')
  addDepartment(@Body() data: DepartmentDTO): string {
    return this.departmentService.addDepartment(data);
  }

  @Get('deletedepartment/:id')
  deleteDepartment(@Param() id: string): string {
    return this.departmentService.deleteDepartment(id);
  }

  @Put('updatedepartment')
  updateDepartment(@Body() data: DepartmentDTO): string {
    return this.departmentService.updateDepartment(data);
  }

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


  //Division CRUD part
  @Get('getdivision')
  getDivision(): DivisionDTO {
    return this.divisionService.getDivision();
  }

  @Get('getdivision/:name')
  getDivisionByName(@Param() name: string): DivisionDTO {
    return this.divisionService.getDivisionByName(name);
  }

  @Post('adddivision')
  addDivision(@Body() data: DivisionDTO): string {
    return this.divisionService.addDivision(data);
  }

  @Get('deletedivision/:id')
  deleteDivision(@Param() id: string): string {
    return this.divisionService.deleteDivision(id);
  }

  @Put('updatedivision')
  updateDivision(@Body() data: DivisionDTO): string {
    return this.divisionService.updateDivision(data);
  }
}