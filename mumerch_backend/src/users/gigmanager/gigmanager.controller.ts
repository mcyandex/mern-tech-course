import { BadRequestException, Body, ConflictException, Controller, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Put, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { UserProfileDTO } from "src/models/userProfile/userProfile.dto";
import * as fs from 'fs-extra';
import * as bcrypt from 'bcrypt';
import { UserProfileService } from "src/models/userProfile/userProfile.service";
import { ChangePassword } from "src/models/login/login.dto";
import { LoginEntity } from "src/models/login/login.entity";
import { LoginService } from "src/models/login/login.service";
import { GigDTO } from "src/models/gig/gig.dto";
import { GigService } from "src/models/gig/gig.service";
import { GigManagerService } from "src/models/gigManager/gigManager.service";
import { GigManagerDTO } from "src/models/gigManager/gigManager.dto";
import { BandService } from "src/models/band/band.service";
import { BandDTO } from "src/models/band/band.dto";
import { OrderEntity } from "src/models/order/order.entity";
import { OrderService } from "src/models/order/order.service";
import { CustomerEntity } from "src/models/customer/customer.entity";
import { CustomerService } from "src/models/customer/customer.service";
import { OrderProductsMapService } from "src/models/orderProductsMap/orderProductsMap.service";
import { SessionGigManagerGuard } from "./SessionGigGaurd.gaurd";


@Controller('gigmanager')
@UseGuards(SessionGigManagerGuard)
export class GigManagerController 
{
    constructor
    (
        private readonly loginService: LoginService,
        private readonly userProfileService: UserProfileService,
        private readonly gigService: GigService,
        private readonly gigManagerService: GigManagerService,
        private readonly bandService: BandService,
        private readonly orderService: OrderService,
        private readonly customerService: CustomerService,
        private readonly orderProductsMapService: OrderProductsMapService,
        
    ) {}


// SignUp 
// Login
// UserProfile(Login, UserProfile) 
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
        destination: './temp/userprofile',
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
    const destinationDir = './uploads/userprofile';
    const filePath = `${destinationDir}/${newFileName}`;

    data.image = newFileName
    data.login = session.user.id
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }
    await fs.promises.rename(myfileobj.path, filePath);
    return this.userProfileService.addUserProfile(data).catch(err => {
        throw new ConflictException({
          message: err.message
        });
      });;
  }

  @Put('updateuserprofile')
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
        destination: './temp/userprofile',
        filename: function (req, file, cb) {
          let name = req.body.name;
          console.log(name);
          cb(null, `${name}.${file.originalname.split('.')[1]}`);
        },
      }),
    })
  )
  async updateUserProfile(@UploadedFile() myfileobj: Express.Multer.File, @Body() data: UserProfileDTO, @Session() session) {
    if (myfileobj != null || myfileobj.size > 0) {
      const newFileName = `${session.user.id}.${myfileobj.originalname.split('.')[1]}`;
      const destinationDir = './uploads/userprofile';
      const filePath = `${destinationDir}/${newFileName}`;
      data.image = newFileName
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }
      await fs.promises.rename(myfileobj.path, filePath);
    }
    return this.userProfileService.updateUserProfile(session.user.id, data);
}


// ChangePassword(Login)
@Patch('changepassword')
  @UseGuards()
  async resetPassword(@Body() data: ChangePassword, @Session() session) {
    if (data.password != data.oldPassword) {
      if (data.password == data.reTypePassword) {
        const res: boolean = await bcrypt.compare(data.oldPassword, session.user.password)
        if (res) {
          const newData = new LoginEntity()
          newData.password = await this.loginService.getHassedPassword(data.password)
          return await this.loginService.updateUserLoginInfo(session.user.id, newData)
        }
        return new ForbiddenException({ message: "User not identified" })
      }
      return new BadRequestException({ message: "Re-typed password didnot match" })
    }
    return new BadRequestException({ message: "Old and newly provided password matched, please give a new unique one" })
  } 

// ForgetPassword(Login+Token) 


// Gig Management 
// Gig (Gig, GigManager, Band) ---------------------- CRUD gigs added by him
//1. Adding gig
@Post('addGig')
  @UsePipes(new ValidationPipe())
  async addGig(@Body() data: GigDTO, @Session() session): Promise<GigDTO> {
    data.login = session.user.id
    return this.gigService.addGig(data).catch(err => {
        throw new ConflictException({
          message: err.message
        });
      });;
  } 
//2. Adding GigManager
// @Post('addGigManager')
//   @UsePipes(new ValidationPipe())
//   async addGigManager(@Body() data: GigManagerDTO, @Session() session): Promise<GigManagerDTO> {
//     data.gigId = session.user.id
//     return this.gigManagerService.addGigManager(data).catch(err => {
      //   throw new ConflictException({
      //     message: err.message
      //   });
      // });;
//   } 
@Post('addGigManager')
  @UsePipes(new ValidationPipe())
  async addGigManager(@Body() data: GigManagerDTO): Promise<boolean> {
    const lastID = await this.gigManagerService.findLastUserGigManagerId();
    const password = Date.now() + '$' 

    data.id = lastID
    return false
  }
//3. Adding band
@Post('addBand')
  @UsePipes(new ValidationPipe())
  async addBand(@Body() data: BandDTO, @Session() session): Promise<BandDTO> {
    data.login = session.user.id
    return this.bandService.addBand(data).catch(err => {
        throw new ConflictException({
          message: err.message
        });
      });;
  } 


// Order Management 
// Order ------------------------------------------------- view for his gigId 
@Get('getOrder/:id')
getOrderByGigId(@Session() session, @Param('id') id:string){
      return this.orderService.getOrderByGigId(session.user.id)
   }

// Customer Management 
// Customer -------------------------------------------- view for his gigId 
@Get('getCustomer/:id')
getCustomerByGigId(@Session() session, @Param('id') id:string){
      return this.customerService.getCustomerByGigId(session.user.id)
    }
 

// Reports ************ 
// Sales Report ---------------------------------------- generate a PDF of total sales for gigId
@Get('salesreport')
  async getSalesReport(@Session() session, @Param('id') id:string): Promise<any> {
    const gig = await this.gigService.getGigByGigMId(session.user.id)
    console.log(gig)
    const data = await this.orderProductsMapService.getOrderProductsMapWithReportByGigId(gig.id)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No sales data available yet" })
    }
    else {
      const report = {}
      for (const item of data) {
        const id = item.productDetails.id
        const productName = item.productDetails.name
        const quantity = item.productDetails.quantity
        const sales = item.orderQuantity

        if (report.hasOwnProperty(id)) {
          report[id].productName = productName
          report[id].sales += sales;
          report[id].quantity = Math.max(report[id].quantity, quantity);
        } else {
          report[id] = {
            productName: productName,
            sales: sales,
            quantity: quantity,
          };
        }
      }
      const reportArray = Object.values(report);
      return reportArray;
    }
  } 

// Monthly Revenue Report ------------------------- list of products sold in specific month fot gigID 
@Get('revenuereport')
  async getRevenueReport(@Session() session, @Param('id') id:string): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReportByGigId(session.user.id)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No sales data available yet" })
    }
    else {
      const report = {}
      for (const item of data) {
        const id = item.productDetails.id
        const productName = item.productDetails.name
        const price = item.productDetails.orderPrice
        const revenuePercentage = item.productDetails.product.revenuePercentage
        const quantity = item.productDetails.quantity
        const revenue = (1 - (revenuePercentage / 100)) * quantity

        if (report.hasOwnProperty(id)) {
          report[id].productName = productName
          report[id].price = Math.max(report[id].price, price);
          report[id].revenue += revenue;
          report[id].quantity = Math.max(report[id].quantity, quantity);
        } else {
          report[id] = {
            productName: productName,
            price: price,
            revenue: revenue,
            quantity: quantity,
          };
        }
      }
      const reportArray = Object.values(report);
      return reportArray;
    }
  } 

// Bar Charts ------------------------------------------- sales by 12 months for gigId
@Get('barchart')
  async getBarChart(@Session() session, @Param('id') id:string): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReportByGigId(session.user.id)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No sales data available yet" })
    }
    else {
      const report = {}
      for (const item of data) {
        const date = new Date(item.order.date)
        const month = date.getMonth() + 1
        const sales = item.orderQuantity

        if (report.hasOwnProperty(month)) {
          report[month].month = month
          report[month].sales += sales
        } else {
          report[month] = {
            month: month,
            sales: sales,
          };
        }
      }
      for (let month = 1; month <= 12; month++) {
        if (!report.hasOwnProperty(month)) {
          report[month] = {
            month: month,
            sales: 0
          }
        }
      }
      const reportArray = Object.values(report);
      return reportArray;
    }
  }
}


