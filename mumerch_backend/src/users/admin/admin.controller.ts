import { BadRequestException, Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Session, Delete, NotFoundException } from "@nestjs/common";
import { SizeDTO } from "src/models/size/size.dto";
import { SizeService } from "src/models/size/size.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { DesignationService } from "src/models/designation/designation.service";
import { ColorDTO } from "src/models/color/color.dto";
import * as fs from 'fs-extra';
import * as bcrypt from 'bcrypt';
import { UserProfileDTO } from "src/models/userProfile/userProfile.dto";
import { LoginDTO, LoginRegistrationDTO } from "src/models/login/login.dto";
import { LoginService } from "src/models/login/login.service";
import { SessionAdminGuard } from "./sessionAdminGaurd.gaurd";
import { UserProfileService } from "src/models/userProfile/userProfile.service";
import { ProductDTO } from "src/models/product/product.dto";
import { ProductService } from "src/models/product/product.service";
import { OrderService } from "src/models/order/order.service";
import { OrderDTO } from "src/models/order/order.dto";
import { AuthService } from "../authentication/auth.service";
import { CategoryDTO } from "src/models/category/category.dto";
import { CategoryService } from "src/models/category/category.service";
import { ColorService } from "src/models/color/color.service";
import { ProductColorMapService } from "src/models/productColorMap/productColorMap.service";
import { ProductSizeMapService } from "src/models/productSizeMap/productSizeMap.service";
import { ProductColorMapEntity } from "src/models/productColorMap/productColorMap.entity";
import { ProductSizeMapEntity } from "src/models/productSizeMap/productSizeMap.entity";
import { BandService } from "src/models/band/band.service";
import { BandDTO } from "src/models/band/band.dto";

@Controller('admin')
@UseGuards(SessionAdminGuard)
export class AdminController {
  constructor(
    private readonly loginService: LoginService,
    private readonly userProfileService: UserProfileService,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorService,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
    private readonly productColorMapService: ProductColorMapService,
    private readonly productSizeMapService: ProductSizeMapService,
    private readonly bandService: BandService
  ) { }

  //UpdateProfile(Login,UserProfile)
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
    return this.userProfileService.addUserProfile(data);
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

  //!!---UserManagement CRUD Part---!!
  //1.Admin
  @Post('addadmin')
  @UsePipes(new ValidationPipe())
  async addAdmin(@Body() data: LoginRegistrationDTO): Promise<boolean> {
    const lastID = await this.loginService.findLastUserLoginId();
    const password = Date.now() + '$' + data.phoneNumber

    data.id = lastID
    data.password = await this.loginService.getHassedPassword(password)
    data.userType = 'admin'
    const res = this.loginService.addUserLoginInfo(data);

    if (res != null) {
      return this.authService.sendLoginInfoMail(lastID, password, data.email)
    }
    return false
  }
  //2.Employee
  @Post('addemployee')
  @UsePipes(new ValidationPipe())
  async addEmployee(@Body() data: LoginRegistrationDTO): Promise<boolean> {
    const lastID = await this.loginService.findLastUserLoginId();
    const password = Date.now() + '$' + data.phoneNumber

    data.id = lastID
    data.password = await this.loginService.getHassedPassword(password)
    data.userType = 'employee'
    const res = this.loginService.addUserLoginInfo(data);

    if (res != null) {
      return this.authService.sendLoginInfoMail(lastID, password, data.email)
    }
    return false
  }



  //3.Band Manager(login,band, bandManager)
  @Post('addbandmanager')
  @UsePipes(new ValidationPipe())
  async addBandManager(@Body() data: LoginRegistrationDTO): Promise<boolean> {
    const lastID = await this.loginService.findLastUserLoginId();
    const password = Date.now() + '$' + data.phoneNumber

    data.id = lastID
    data.password = await this.loginService.getHassedPassword(password)
    data.userType = 'bandmanager'
    const res = this.loginService.addUserLoginInfo(data);

    if (res != null) {
      return this.authService.sendLoginInfoMail(lastID, password, data.email)
    }
    return false
  }

  //4.Gig Manager(login,gig,gigManager)-------->status:true(admin approval)
  @Post('addgigmanager')
  @UsePipes(new ValidationPipe())
  async addGigManager(@Body() data: LoginRegistrationDTO): Promise<boolean> {
    const lastID = await this.loginService.findLastUserLoginId();
    const password = Date.now() + '$' + data.phoneNumber

    data.id = lastID
    data.password = await this.loginService.getHassedPassword(password)
    data.userType = 'gigmanager'
    const res = this.loginService.addUserLoginInfo(data);

    if (res != null) {
      return this.authService.sendLoginInfoMail(lastID, password, data.email)
    }
    return false
  }


  //!!---ProductManagement CRUD Part---!!
  //1.-----------------------------Category-----------------------------
  @Get('getcategory')
  async getCategory(): Promise<any> {
    const data = await this.categoryService.getCategory();
    if (data != null) {
      throw new NotFoundException({ message: "No Category created yet" })
    }
    return data
  }
  @Get('getCategory/:name')
  async getCategoryByName(@Param() name: string): Promise<CategoryDTO[]> {
    const data = await this.categoryService.getCategoryByName(name)
    if (data != null) {
      throw new NotFoundException({ message: "No Category created yet" })
    }
    return data;
  }
  @Post('addCategory')
  @UsePipes(new ValidationPipe())
  async addCategory(@Body() data: CategoryDTO, @Session() session): Promise<CategoryDTO> {
    data.login = session.user.id
    return this.categoryService.addCategory(data);
  }
  @Put('updateCategory/:id')
  @UsePipes(new ValidationPipe())
  updateCategory(@Param('id') id: string, @Body() data: CategoryDTO, @Session() session): Promise<CategoryDTO> {
    data.login = session.user.id
    return this.categoryService.updateCategory(id, data);
  }
  @Delete('deleteCategory/:id')
  async deleteCategory(@Param('id') id: string): Promise<string> {
    const res = await this.categoryService.deleteCategory(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  //2.-----------------------------Size-----------------------------
  @Get('getsize')
  async getSize(): Promise<any> {
    const data = await this.sizeService.getSize();
    if (data != null) {
      throw new NotFoundException({ message: "No size created yet" })
    }
    return data
  }
  @Get('getsize/:name')
  async getSizeByName(@Param() name: string): Promise<SizeDTO[]> {
    const data = await this.sizeService.getSizeByName(name)
    if (data != null) {
      throw new NotFoundException({ message: "No size created yet" })
    }
    return data;
  }
  @Post('addsize')
  @UsePipes(new ValidationPipe())
  async addSize(@Body() data: SizeDTO, @Session() session): Promise<SizeDTO> {
    data.login = session.user.id
    return this.sizeService.addSize(data);
  }
  @Put('updatesize/:id')
  @UsePipes(new ValidationPipe())
  updateSize(@Param('id') id: string, @Body() data: SizeDTO, @Session() session): Promise<SizeDTO> {
    data.login = session.user.id
    return this.sizeService.updateSize(id, data);
  }
  @Delete('deletesize/:id')
  async deleteSize(@Param('id') id: string): Promise<string> {
    const res = await this.sizeService.deleteSize(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  //3.-----------------------------Color-----------------------------
  @Get('getcolor')
  async getColor(): Promise<any> {
    const data = await this.colorService.getColor();
    if (data != null) {
      throw new NotFoundException({ message: "No Color created yet" })
    }
    return data
  }
  @Get('getcolor/:name')
  async getColorByName(@Param() name: string): Promise<ColorDTO[]> {
    const data = await this.colorService.getColorByName(name)
    if (data != null) {
      throw new NotFoundException({ message: "No Color created yet" })
    }
    return data;
  }
  @Post('addcolor')
  @UsePipes(new ValidationPipe())
  async addColor(@Body() data: ColorDTO, @Session() session): Promise<ColorDTO> {
    data.login = session.user.id
    return this.colorService.addColor(data);
  }
  @Put('updatecolor/:id')
  @UsePipes(new ValidationPipe())
  updateColor(@Param('id') id: string, @Body() data: ColorDTO, @Session() session): Promise<ColorDTO> {
    data.login = session.user.id
    return this.colorService.updateColor(id, data);
  }
  @Delete('deletecolor/:id')
  async deleteColor(@Param('id') id: string): Promise<string> {
    const res = await this.colorService.deleteColor(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  //4.Product(color,size,product,band,category) --> Gig Shifted to Order
  @Get('getProduct')
  async getProduct(): Promise<any> {
    const data = await this.productService.getProduct();
    if (data != null) {
      throw new NotFoundException({ message: "No Product created yet" })
    }
    return data
  }
  @Get('getProduct/:name')
  async getProductByName(@Param() name: string): Promise<ProductDTO[]> {
    const data = await this.productService.getProductByName(name)
    if (data != null) {
      throw new NotFoundException({ message: "No Product created yet" })
    }
    return data;
  }
  @Post('addProduct')
  @UsePipes(new ValidationPipe())
  async addProduct(@Body() data: ProductDTO, @Session() session): Promise<ProductDTO> {
    data.login = session.user.id
    const product = await this.productService.addProduct(data)
    if(product!=null){
      for(const item of data.productColorsMap){
        const res = await this.colorService.getColorById(item.id)
        if(res!=null){
          const newData = new ProductColorMapEntity()
          newData.color = res
          newData.product = product
          await this.productColorMapService.addProductColorMap(newData)
        }
      }
      for(const item of data.productSizesMap){
        const res = await this.sizeService.getSizeById(item.id)
        if(res!=null){
          const newData = new ProductSizeMapEntity()
          newData.size = res
          newData.product = product
          await this.productSizeMapService.addProductSizeMap(newData)
        }
      }
      return product
    }
    throw new NotFoundException({message:"Proper data for product not found"})
  }
  @Put('updateProduct/:id')
  @UsePipes(new ValidationPipe())
  updateProduct(@Param('id') id: string, @Body() data: ProductDTO, @Session() session): Promise<ProductDTO> {
    data.login = session.user.id
    return this.productService.updateProduct(id, data);
  }
  @Delete('deleteProduct/:id')
  async deleteProduct(@Param('id') id: string): Promise<string> {
    const res = await this.productService.deleteProduct(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  //!!---BandManagement  CRUD Part---!!
  //1.Band
  @Get('getBand')
  async getBand(): Promise<any> {
    const data = await this.bandService.getBand();
    if (data != null) {
      throw new NotFoundException({ message: "No Band created yet" })
    }
    return data
  }
  @Get('getBand/:name')
  async getBandByName(@Param() name: string): Promise<BandDTO[]> {
    const data = await this.bandService.getBandByName(name)
    if (data != null) {
      throw new NotFoundException({ message: "No Band created yet" })
    }
    return data;
  }
  @Post('addBand')
  @UsePipes(new ValidationPipe())
  async addBand(@Body() data: BandDTO, @Session() session): Promise<BandDTO> {
    data.login = session.user.id
    return this.bandService.addBand(data);
  }
  @Put('updateBand/:id')
  @UsePipes(new ValidationPipe())
  updateBand(@Param('id') id: string, @Body() data: BandDTO, @Session() session): Promise<BandDTO> {
    data.login = session.user.id
    return this.bandService.updateBand(id, data);
  }
  @Delete('deleteBand/:id')
  async deleteBand(@Param('id') id: string): Promise<string> {
    const res = await this.bandService.deleteBand(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }


  //!!---GigManagement CRUD Part---!!
  //1.Gig(Gig, Gig manager, Band)----------View in poster mode


  //!!---OrderManagement---!!
  //1.Order(login,productOrderMap)---------view


  //!!---Reports---!!
  //1.Sales Report-------------------generate a PDF of total sales
  //2.Monthly revenue report---------list of products sold in spcific month
  //3.Bar Charts---------------------sales by 12 months

  //From admin end
  @Get('getallsizesbyadmin')
  getAllSizesByAdminId(@Session() session) {
    return this.loginService.getAllSizeAssociatedWithUserById(session.user.id)
  }

  @Get('getallsizesbyuid')
  getAllSizesByUid(@Session() session) {
    return this.sizeService.getAllSizeByUserId(session.user.id)
  }

  @Get('getsizebyuid/:id')
  getSizeByUid(@Session() session, @Param('id') id: string) {
    return this.sizeService.getSizeByUserId(session.user.id, id)
  }

  @Delete('deletesizebyuid/:id')
  async deleteSizeByUid(@Param('id') id: string, @Session() session): Promise<string> {
    const specSize = await this.sizeService.getSizeByUserId(session.user.id, id)
    const res = await this.sizeService.deleteSize(specSize.id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  @Put('updatesizebyuid/:sid')
  async updateSizeByUid(@Param('sid') sid: string, @Session() session, @Body() data: SizeDTO): Promise<SizeDTO> {
    const specSize = await this.sizeService.getSizeByUserId(session.user.id, sid)
    if (specSize == null) {
      throw new NotFoundException('Size not found')
    }
    return await this.sizeService.updateSize(specSize.id, data);
  }

  //Order CRUD part
  @Get('getorder')
  getOrder(): Promise<OrderDTO[]> {
    return this.orderService.getOrder();
  }

  // @Get('getallordersbyuid')
  // getAllOrdersByUid(@Session() session){
  //   return this.loginService.getAllOrderAssociatedWithUserById(session.user.id)
  // }

  @Post('addorder')
  async addOrder(@Body() data: OrderDTO): Promise<OrderDTO> {
    return this.orderService.addOrder(data)
  }

  @Delete('deleteorder/:id')
  async deleteOrder(@Param('id') id: string): Promise<string> {
    const res = await this.orderService.deleteOrder(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  @Put('updateorder/:id')
  updateOrder(@Param('id') id: string, @Body() data: OrderDTO): Promise<OrderDTO> {
    return this.orderService.updateOrder(id, data);
  }

  // @Put('updateuser')
  // @UsePipes(new ValidationPipe())
  // updateUserLoginInfo(@Body() data:LoginRegistrationDTO):Promise<LoginDTO>{

  // }

  @Get('getalluserslogininfo')
  getAllUsersLoginInfo(): Promise<LoginDTO[]> {
    return this.loginService.getUserLoginInfo()
  }
  // @Get('/getuser')
  // async getAllUsers(): Promise<UserProfileDTO[]> {
  //   const users = await this.userService.getUser();
  //   return users;
  // }
}