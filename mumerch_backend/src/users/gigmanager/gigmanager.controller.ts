import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { GigDTO, GigResgistrationDTO } from "src/models/gig/gig.dto";
import { GigService } from "src/models/gig/gig.service";

@Controller('gig')
export class GigManagerController {
  constructor(private readonly gigService: GigService 
    ) { }

//gig CRUD part
  @Get('getgig')
  getGig(): string {
    return this.gigService.getGig();
  }

  @Get('getgig/:name')
  getGigById(@Param() id: string): string {
    return this.gigService.getGigById(id);
  }


  @Get('deletegig/:id')
  deleteGig(@Param() id: string): string {
    return this.gigService.deleteGig(id);
  }

  @Put('updategig')
  updateGig(@Body() data: GigDTO): GigDTO {
    return this.gigService.updateGig(data);
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
      limits: { fileSize: 80000000 },
      storage: diskStorage({
        destination: './uploads/gig',
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
    return data.name;
  }
}