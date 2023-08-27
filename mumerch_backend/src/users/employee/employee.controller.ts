import { OrderDTO } from "src/models/order/order.dto";
import { OrderService } from "src/models/order/order.service";
import { SessionEmployeeGuard } from "./SessionEmployeeGaurd.gaurd";
import { BadRequestException, Body, Controller, ForbiddenException, NotFoundException, Get, Post, Put, Delete, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Param, ConflictException, ParseIntPipe, Res, Query } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { UserProfileDTO } from "src/models/userProfile/userProfile.dto";
import * as fs from 'fs-extra';
import { UserProfileService } from "src/models/userProfile/userProfile.service";
import { LoginService } from "src/models/login/login.service";
import { ChangePassword } from "src/models/login/login.dto";
import { LoginEntity } from "src/models/login/login.entity";
import * as bcrypt from 'bcrypt';
import { CategoryService } from "src/models/category/category.service";
import { CategoryDTO } from "src/models/category/category.dto";
import { ColorService } from "src/models/color/color.service";
import { ColorDTO } from "src/models/color/color.dto";
import { SizeService } from "src/models/size/size.service";
import { ProductService } from "src/models/product/product.service";
import { BandService } from "src/models/band/band.service";
import { SizeDTO } from "src/models/size/size.dto";
import { ProductDTO } from "src/models/product/product.dto";
import { BandDTO } from "src/models/band/band.dto";
import { CustomerService } from "src/models/customer/customer.service";
import { GigEntity } from "src/models/gig/gig.entity";
import { GigService } from "src/models/gig/gig.service";
import { GigDTO } from "src/models/gig/gig.dto";
import { OrderProductsMapEntity } from "src/models/orderProductsMap/orderProductsMap.entity";
import { OrderProductsMapService } from "src/models/orderProductsMap/orderProductsMap.service";
import { ProductDetailsService } from "src/models/productDetails/productDetails.service";
import { CommonService } from "src/common/common.service";
import { OrderEntity } from "src/models/order/order.entity";
import { orderProductsMapDTO } from "src/models/orderProductsMap/orderProductsMap.dto";
import { SessionLoginGuard } from "src/auth/loginSession.gaurd";
import session from "express-session";
import { ProductEntity } from "src/models/product/product.entity";
import { ProductDetailsEntity } from "src/models/productDetails/productDetails.entity";
import { SizeEntity } from "src/models/size/size.entity";
import { CategoryEntity } from "src/models/category/category.entity";
import { ColorEntity } from "src/models/color/color.entity";


@Controller('employee')
@UseGuards(SessionEmployeeGuard)
export class EmployeeController {
  constructor(
    private readonly loginService: LoginService,
    private readonly userProfileService: UserProfileService,
    private readonly categoryService: CategoryService,
    private readonly colorService: ColorService,
    private readonly sizeService: SizeService,
    private readonly productService: ProductService,
    private readonly bandService: BandService,
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
    private readonly gigService: GigService,
    private readonly orderProductsMapService: OrderProductsMapService,
    private readonly productDetailsService: ProductDetailsService,
    private readonly commonService: CommonService
  ) { }

  //UpdateProfile(loging,UserProfile)
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
    return this.userProfileService.addUserProfile(data)
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
    @Get('getuserprofile/:id')
  //async GetUserProfile(@Session() session) {
  async GetUserProfile(@Param('id') id: string) {
    const data = await this.userProfileService.getUserProfileByLoginInfo(id)
    if (data == null) {
      throw new NotFoundException({ message: "No user profile created yet" })
    }
    else {
      const url = 'http://localhost:3000/employee/getimage/?type=userProfile&image='
      data.image = url + data.image
      return data
    }
  }

  @Get('getimage')
  getProfilePic(@Query() qry: any, @Res() res) {
    const image = qry.image
    const path = `./uploads/${qry.type}/`
    const fullpath = path + image
    if (!fs.existsSync(fullpath)) {
      throw new NotFoundException('Image not found');
    }
    res.sendFile(image, { root: path })
  }

  //ChangePassword(login)
  @Post('changepassword')
  @UseGuards(SessionLoginGuard)
  async changePassword(@Body() data: ChangePassword, @Session() session) {
    if (data.password == data.reTypePassword) {
      console.log(session.user.password, data.password, session)
      const res: boolean = await bcrypt.compare(data.oldPassword, session.user.password)
      if (res) {
        const newData = new LoginEntity()
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(data.password, salt);
        newData.password = hassedpassed
        return await this.loginService.updateUserLoginInfo(session.user.id, newData)
      }
      return new ForbiddenException({ message: "User not identified" })
    }
    return new BadRequestException({ message: "Re-typed password didnot match" })
  }
  //ForgetPassword(Login+Token)

  //!!---Product Management CRUD Part---!!
  //Product(Color,Size,Category,Product,,Band)-------->view

  //1.-----------------------------Color-----------------------------
  @Get('getcolor/:id')
  async getColor(@Param('id') id: string): Promise<ColorEntity> {
    const data = await this.colorService.getColorByIdWithLoginInfo(id);
    if (data != null) {
      return data
    }
    else {
      throw new NotFoundException({ message: "No Color created yet" })
    }
    return data;
  }
  @Get('getcolorbyname/:name?')
  async getColorByName(@Param('name') name: string): Promise<ColorEntity[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.colorService.getColorByName(searchingName)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Color created yet" })
    }
    return data;
  }

  //2.-----------------------------Size-----------------------------
  @Get('getsize')
  async getSize(): Promise<any> {
    const data = await this.sizeService.getSize();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No size created yet" })
    }
    return data
  }
  @Get('getsizebyname/:name?')
  async getSizeByName(@Param('name') name: string): Promise<SizeEntity[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.sizeService.getSizeByNameWithLoginInfo(searchingName)
    return data;
  }

  @Get('getsizebyid/:id')
  async getSizeById(@Param('id') id: string): Promise<SizeEntity> {
    const data = await this.sizeService.getSizeByIdWithLoginInfo(id)
    if (data != null) {
      return data;
    }
    else {
      throw new NotFoundException({ message: `Size with: ${id} not found` })
    }
  }

  //3.-----------------------------Category-----------------------
  @Get('getcategorybyid/:id')
  async getCategory(@Param('id') id: string): Promise<CategoryEntity> {
    const data = await this.categoryService.getCategoryWithLoginId(id);
    if (data == null) {
      throw new NotFoundException({ message: "No Category created yet" })
    }
    return data;
  }
  @Get('getcategory/:name?')
  async getCategoryByName(@Param('name') name: string): Promise<CategoryEntity[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.categoryService.getCategoryByName(searchingName)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Category created yet" })
    }
    return data;
  }
  //4.-----------------------------Product--------------------------
  @Get('getProduct')
  async getProduct(): Promise<ProductDetailsEntity[]> {
    const data = await this.productDetailsService.getProductDetailsWithProductInfo();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Product created yet" })
    }
    return data
  }
  @Get('getProduct/:name')
  async getProductByName(@Param('name') name: string): Promise<ProductDetailsEntity[]> {
    const data = await this.productDetailsService.getProductDetailsByName(name)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Product created yet" })
    }
    return data;
  }

  //6.-----------------------------Band--------------------------
  @Get('getBand')
  async getBand(): Promise<any> {
    const data = await this.bandService.getBand();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Band created yet" })
    }
    return data
  }
  @Get('getBand/:name')
  async getBandByName(@Param('name') name: string): Promise<BandDTO[]> {
    const data = await this.bandService.getBandByName(name)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Band created yet" })
    }
    return data;
  }

  //!!---Gig Management---!!
  //Gig--------------------> view in poster format
  @Get('getGig')
  async getGig(): Promise<GigEntity[]> {
    const data = await this.gigService.getGig();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Gig created yet" })
    }
    return data
  }
  @Get('getGig/:name')
  async getGigByName(@Param('name') name: string): Promise<GigDTO[]> {
    const data = await this.gigService.getGigByName(name)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Gig created yet" })
    }
    return data;
  }
  //!!----------------Order Management CRUD Part----------------------!!
  //1.Order(Customer,login, ProductOrderMap)
  //2.Generate Invoice
  //add order
  @Post('addorder')
  @UsePipes(new ValidationPipe())
  async addOrder(@Body() data: OrderDTO, @Session() session, @Res() res): Promise<any> {
    data.date = new Date()
    data.login = session.user.id
    data.customer.login = session.user.id
    const customer = await this.customerService.addCustomer(data.customer)
    data.customer = customer
    const order = await this.orderService.addOrder(data)

    if (order != null) {
      for (const item of data.orderProducts) {
        const newData = new OrderProductsMapEntity()

        const exProduct = await this.productDetailsService.getProductDetailsById(item.productDetails.id);
        if (exProduct.quantity > item.orderQuantity) {
          newData.order = order
          newData.orderPrice = item.productDetails.product.price
          newData.orderQuantity = item.orderQuantity
          newData.productDetails = item.productDetails

          const orderDetails = await this.orderProductsMapService.addOrderProductsMap(newData)
          if (orderDetails != null) {
            const exProduct = await this.productDetailsService.getProductDetailsById(item.productDetails.id)
            const newQuantity = exProduct.quantity - item.orderQuantity
            exProduct.quantity = newQuantity
            const newProduct = await this.productDetailsService.updateProductDetails(exProduct.id, exProduct)
            if (newProduct != null) {
              const html = await this.commonService.invoiceStructure(order.id)
              await this.commonService.generatePdf(html, 'invoice', order.id)
              const fileName = `${order.id}` + `.pdf`
              const path = `./uploads/invoice/`
              res.sendFile(fileName, { root: path })
            }
            else {
              throw new NotFoundException({ message: "Something went wrong" })
            }
          }
          else {
            await this.orderService.deleteOrder(order.id)
            throw new BadRequestException({ message: "Order details not." });
          }
        }
        else {
          throw new BadRequestException({ message: "Order quantity exceeds product quantity." });
        }
      }
    }
    else{
      throw new BadRequestException({message:"Something went wrong"})
    }
  }

  @Get('getorder')
  async getOrder(): Promise<OrderEntity[]> {
    const data = await this.orderService.getOrderWithOrderProductsMap()
    if (data.length === 0) {
      throw new NotFoundException({ message: "No order placed yet" })
    }
    return data
  }

  @Get('getorder/:id')
  async getOrderById(@Param('id') id: string): Promise<OrderEntity> {
    const data = await this.orderService.getOrderById(id);
    if (data != null) {
      throw new NotFoundException('Order with name ${name} not found');
    }
    return data;
  }

  @Put('updateOrder/:id')
  async updateOrder(@Param('id') id: string, @Body() data: orderProductsMapDTO, @Session() session): Promise<OrderProductsMapEntity> {
    data.order.login = session.user.id
    return await this.orderProductsMapService.updateOrderProductsMap(id, data)
  }

  @Delete('deleteOrder/:id')
  async delete(@Param('id') id: string): Promise<string> {
    const res = await this.orderProductsMapService.deleteOrderProductsMap(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  //!!---Reports(Performance)---!!
  //1.Sales Report ---------------------------------------- generate a PDF of total sales for loginId type = emp..
  @Get('salesreport')
  async getSalesReport(@Session() session): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReportEmp(session.user.id)
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
  @Get('salesreport/:month')
  async getSalesReportForSpecificMonth(@Param('month', ParseIntPipe) month: number, @Session() session): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReportEmp(session.user.id)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No sales data available yet" })
    }
    else {
      const report = {}
      for (const item of data) {
        const qMon = new Date(item.date).getMonth() + 1
        if (month === qMon) {
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
  }
  //2.Monthly Revenue Report ------------------------- list of products sold in specific month for loginId type = emp.. 
  @Get('revenuereport')
  async getRevenueReport(@Session() session): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReportEmp(session.user.id)
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
  //3.Bar Charts ------------------------------------------- sales by 12 months for loginId type = emp.. 
  @Get('barchart')
  async getBarChart(@Session() session): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReportEmp(session.user.id)
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

  @Get('getcount')
  async getAllsCount(): Promise<object> {
    const adminCount = await this.loginService.getUserTypeCount("admin");
    const employeeCount = await this.loginService.getUserTypeCount("employee");
    const bandManagerCount = await this.loginService.getUserTypeCount("bandmanager");
    const gigManagerCount = await this.loginService.getUserTypeCount("gigmanager");
    const customerCount = await this.customerService.getCount();
    const bandCount = await this.bandService.getCount();
    const gigCount = await this.gigService.getCount();
    const productCount = await this.productDetailsService.getCount();

    const counts = {
      admin: adminCount,
      employee: employeeCount,
      bandManager: bandManagerCount,
      gigManager: gigManagerCount,
      customer: customerCount,
      band: bandCount,
      gig: gigCount,
      product: productCount
    };
    return counts;
  }

}