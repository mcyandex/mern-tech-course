import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { GigDTO, GigResgistrationDTO } from "src/models/gig/gig.dto";
import { GigService } from "src/models/gig/gig.service";
import { SizeDTO } from "src/models/size/size.dto";
import { UnitService } from "src/models/unit/unit.service";

@Controller('gig')
export class GigController {
  constructor(private readonly gigService: GigService 
    ) { }

//gig CRUD part
  @Get('getgig')
  getGig(): GigDTO {
    return this.getGig();
  }

  @Get('getgig/:name')
  getGigById(@Param() id: string): GigDTO {
    return this.getGigById(id);
  }

  @Post('addgig')
//   addGig(@Body() data: GigDTO): string {
//     return this.addGig(data);
//   }

  @Get('deletegig/:id')
  deleteGig(@Param() id: string): string {
    return this.deleteGig(id);
  }

  @Put('updategig')
  updateGig(@Body() data: GigDTO): string {
    return this.updateGig(data);
  }

  //GigManager Registration section
  @Post('addgig')
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
  addGig(@UploadedFile() myfileobj: Express.Multer.File, @Body() data: GigResgistrationDTO): string {
    //console.log(myfileobj);
    console.log(myfileobj.filename);
    return data.email;
  }
}