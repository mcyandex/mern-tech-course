
import { BadRequestException, Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { SizeDTO } from "src/models/size/size.dto";
import { SizeService } from "src/models/size/size.service";
import { UserService } from "src/models/user/user.service";
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
import { UserDTO } from "src/models/user/user.dto";
import * as fs from 'fs-extra';
import * as bcrypt from 'bcrypt';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly sizeService: SizeService,
    private readonly designationService: DesignationService,
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

  //User Registration section
  @Post('adduser')
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
  async addUser(
    @UploadedFile() myfileobj: Express.Multer.File,
    @Body() data: UserDTO): Promise<UserDTO> {
      if (!myfileobj || myfileobj.size == 0) {
        throw new BadRequestException('Empty file');
      }
      const lastID = await this.userService.findLastUserId();
      const newFileName = `${lastID}.${myfileobj.originalname.split('.')[1]}`;

      const salt = await bcrypt.genSalt();
      const hassedpassed = await bcrypt.hash(data.password, salt);

      data.id = lastID
      data.image = newFileName
      data.password = hassedpassed

      const destinationDir = './uploads/users';
      const filePath = `${destinationDir}/${newFileName}`;

      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }
      await fs.promises.rename(myfileobj.path, filePath);
      return this.userService.addUser(data);
  }

  //update
  //--->param:id, no file empty validation, direct update

  @Get('/getuser')
  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userService.getUser();
    return users;
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
}