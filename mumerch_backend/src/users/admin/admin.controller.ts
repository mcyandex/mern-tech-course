
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { UnitService } from "src/models/unit/unit.service";
import { SizeDTO } from "src/models/size/size.dto";
import { SizeService } from "src/models/size/size.service";
import { UnitDTO } from "src/models/unit/unit.dto";

@Controller('admin')
export class AdminController {
  constructor(private readonly unitService: UnitService, private readonly sizeService: SizeService) { }
  
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
  getSnit(): UnitDTO {
    return this.unitService.getUnit();
  }

  @Get('getunit/:name')
  getSnitByName(@Param() name: string): UnitDTO {
    return this.unitService.getUnitByName(name);
  }

  @Post('addunit')
  addSnit(@Body() data: UnitDTO): string {
    return this.unitService.addUnit(data);
  }

  @Get('deleteunit/:id')
  deleteSnit(@Param() id: number): string {
    return this.unitService.deleteUnit(id);
  }

  @Put('updateunit')
  updateSnit(@Body() data: UnitDTO): string {
    return this.unitService.updateUnit(data);
  }

}