
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { UnitService } from "src/models/unit/unit.service";
import { SizeDTO } from "src/models/size/size.dto";
import { SizeService } from "src/models/size/size.service";
import { UnitDTO } from "src/models/unit/unit.dto";
import { UserResgistrationDTO } from "src/models/user/user.dto";
import { UserService } from "src/models/user/user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { DepartmentDTO } from "src/models/department/department.dto";
import { DepartmentService } from "src/models/department/department.service";
import { DesignationDTO } from "src/models/designation/designation.dto";
import { DesignationService } from "src/models/designation/designation.service";
import { DivisionDTO } from "src/models/division/division.dto";
import { DivisionService } from "src/models/division/division.service";
import { EmployeeResgistrationDTO } from "src/models/employee/employee.dto";

@Controller('admin')
export class AdminController {
  constructor(private readonly unitService: UnitService,
    private readonly sizeService: SizeService,
    private readonly userService: UserService,
    private readonly departmentService: DepartmentService,
    private readonly designationService: DesignationService,
    private readonly divisionService: DivisionService) { }

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
  deleteUnit(@Param() id: string): string {
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