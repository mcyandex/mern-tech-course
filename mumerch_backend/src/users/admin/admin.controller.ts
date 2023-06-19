
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { UnitService } from "src/models/unit/unit.service";
import { SizeDTO } from "src/models/size/size.dto";
import { SizeService } from "src/models/size/size.service";
import { UnitDTO } from "src/models/unit/unit.dto";
import { UserResgistrationDTO } from "src/models/user/user.dto";
import { UserService } from "src/models/user/user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

@Controller('admin')
export class AdminController {
  constructor(private readonly unitService: UnitService,
    private readonly sizeService: SizeService,
    private readonly userService: UserService) { }

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
  deleteSize(@Param() id: number): string {
    return this.sizeService.deleteSize(id);
  }

  @Put('updatesize')
  updateSize(@Body() data: SizeDTO): string {
    return this.sizeService.updateSize(data);
  }

  //Unit CRUD part
  @Get('getunit')
  getUnit(): UnitDTO {
    return this.unitService.getUnit();
  }

  @Get('getunit/:name')
  getUnitByName(@Param() name: string): UnitDTO {
    return this.unitService.getUnitByName(name);
  }

  @Post('addunit')
  addUnit(@Body() data: UnitDTO): string {
    return this.unitService.addUnit(data);
  }

  @Get('deleteunit/:id')
  deleteUnit(@Param() id: number): string {
    return this.unitService.deleteUnit(id);
  }

  @Put('updateunit')
  updateUnit(@Body() data: UnitDTO): string {
    return this.unitService.updateUnit(data);
  }



  //Admin Registration section
  @Post('adduser')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('myfile',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 800000 },
      storage: diskStorage({
        destination: './uploads/users',
        filename: function (req, file, cb) {
          const name = file.originalname.split('.')[0];
          cb(null, `${name}.${file.originalname.split('.')[1]}`);
        },
      })
    }
  ))
  addUser(@UploadedFile() myfileobj: Express.Multer.File, @Body() data: UserResgistrationDTO): string {
    //console.log(myfileobj);
    console.log(myfileobj.filename);
    return data.email;
  }

}