import { BadRequestException, Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Session, Delete, NotFoundException, Patch, ForbiddenException } from "@nestjs/common";
import { SizeDTO } from "src/models/size/size.dto";
import { SizeService } from "src/models/size/size.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { ColorDTO } from "src/models/color/color.dto";
import * as fs from 'fs-extra';
import * as bcrypt from 'bcrypt';
import { UserProfileDTO } from "src/models/userProfile/userProfile.dto";
import { ChangePassword, Login, LoginDTO, LoginRegistrationDTO } from "src/models/login/login.dto";
import { LoginService } from "src/models/login/login.service";
import { SessionAdminGuard } from "./sessionAdminGaurd.gaurd";
import { UserProfileService } from "src/models/userProfile/userProfile.service";
import { ProductDTO, ProductRegistrationDTO } from "src/models/product/product.dto";
import { ProductService } from "src/models/product/product.service";
import { OrderService } from "src/models/order/order.service";
import { OrderDTO } from "src/models/order/order.dto";
import { AuthService } from "../common/auth.service";
import { CategoryDTO } from "src/models/category/category.dto";
import { CategoryService } from "src/models/category/category.service";
import { ColorService } from "src/models/color/color.service";
import { BandService } from "src/models/band/band.service";
import { BandDTO } from "src/models/band/band.dto";
import { LoginEntity } from "src/models/login/login.entity";
import { GigService } from "src/models/gig/gig.service";
import { GigDTO } from "src/models/gig/gig.dto";
import { OrderProductsMapService } from "src/models/orderProductsMap/orderProductsMap.service";
import { OrderProductsMapEntity } from "src/models/orderProductsMap/orderProductsMap.entity";
import { ProductEntity } from "src/models/product/product.entity";
import { ProductDetailsService } from "src/models/productDetails/productDetails.service";
import { ProductDetailsEntity } from "src/models/productDetails/productDetails.entity";
import { CustomerService } from "src/models/customer/customer.service";
import { OrderEntity } from "src/models/order/order.entity";
import { CategoryEntity } from "src/models/category/category.entity";
import { SizeEntity } from "src/models/size/size.entity";
import { ColorEntity } from "src/models/color/color.entity";
import { BandEntity } from "src/models/band/band.entity";
import { GigEntity } from "src/models/gig/gig.entity";

@Controller('admin')
//@UseGuards(SessionAdminGuard)
export class AdminController {
  constructor(
    private readonly loginService: LoginService,
    private readonly userProfileService: UserProfileService,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorService,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly authService: AuthService,
    private readonly bandService: BandService,
    private readonly gigService: GigService,
    private readonly orderService: OrderService,
    private readonly orderProductsMapService: OrderProductsMapService,
    private readonly productDetailsService: ProductDetailsService,
    private readonly customerService: CustomerService
  ) { }

  //Change Password
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

  @Get('getadmin')
  async getAdmin(): Promise<LoginEntity[]> {
    const userType = 'admin'
    const data = await this.loginService.getUserLoginInfoByUserType(userType);
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Admin created yet" })
    }
    return data
  }
  @Put('updateadmin/:id')
  @UsePipes(new ValidationPipe())
  updateAdmin(@Param('id') id: string, @Body() data: LoginRegistrationDTO): Promise<LoginDTO> {
    data.userType = 'admin'
    return this.loginService.updateUserLoginInfo(id, data);
  }
  @Delete('deleteAdmin/:id')
  async deleteAdmin(@Param('id') id: string): Promise<string> {
    const res = await this.loginService.deleteUserLoginInfo(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  @Get('getadmin/:name')
  async getAdminByName(@Param('name') name: string): Promise<LoginDTO[]> {
    const userType = 'admin'
    const data = await this.loginService.getUserLoginInfoByName(name, userType)
    console.log(data)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Admin found" })
    }
    return data;
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

  @Get('getemployee/:name')
  async getEmployeeByName(@Param('name') name: string): Promise<LoginDTO[]> {
    const userType = 'employee'
    const data = await this.loginService.getUserLoginInfoByName(name, userType)

    if (data.length === 0) {
      throw new NotFoundException({ message: "No employee found" })
    }
    return data;
  }

  @Get('getemployee')
  async getEmployee(): Promise<LoginEntity[]> {
    const userType = 'employee'
    const data = await this.loginService.getUserLoginInfoByUserType(userType);
    if (data.length === 0) {
      throw new NotFoundException({ message: "No employee created yet" })
    }
    return data
  }
  @Put('updateemployee/:id')
  @UsePipes(new ValidationPipe())
  updateEmployee(@Param('id') id: string, @Body() data: LoginRegistrationDTO): Promise<LoginDTO> {
    data.userType = 'employee'
    return this.loginService.updateUserLoginInfo(id, data);
  }
  @Delete('deleteemployee/:id')
  async deleteEmployee(@Param('id') id: string): Promise<string> {
    const res = await this.loginService.deleteUserLoginInfo(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
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

  @Get('getbandmanager/:name')
  async getBandManagerByName(@Param('name') name: string): Promise<LoginEntity[]> {
    const userType = 'bandmanager'
    const data = await this.loginService.getUserLoginInfoByName(name, userType)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Admin found" })
    }
    return data;
  }

  @Get('getbandmanager')
  async getBandManager(): Promise<LoginEntity[]> {
    const userType = 'bandmanager'
    const data = await this.loginService.getUserLoginInfoByUserType(userType);
    if (data.length === 0) {
      throw new NotFoundException({ message: "No bandmanager created yet" })
    }
    return data
  }
  @Put('updatebandmanager/:id')
  @UsePipes(new ValidationPipe())
  updateBandManager(@Param('id') id: string, @Body() data: LoginRegistrationDTO): Promise<LoginDTO> {
    data.userType = 'bandmanager'
    return this.loginService.updateUserLoginInfo(id, data);
  }
  @Delete('deletebandmanager/:id')
  async deleteBandManager(@Param('id') id: string): Promise<string> {
    const res = await this.loginService.deleteUserLoginInfo(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
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

  @Get('getgigmanager/:name')
  async getGigManagerByName(@Param('name') name: string): Promise<LoginDTO[]> {
    const userType = 'gigmanager'
    const data = await this.loginService.getUserLoginInfoByName(name, userType)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Admin found" })
    }
    return data;
  }

  @Get('getgigmanager')
  async getGigManager(): Promise<LoginEntity[]> {
    const userType = 'gigmanager'
    const data = await this.loginService.getUserLoginInfoByUserType(userType);
    if (data.length === 0) {
      throw new NotFoundException({ message: "No gigmanager created yet" })
    }
    return data
  }
  @Put('updategigmanager/:id')
  @UsePipes(new ValidationPipe())
  updateGigManager(@Param('id') id: string, @Body() data: LoginRegistrationDTO): Promise<LoginDTO> {
    data.userType = 'gigmanager'
    return this.loginService.updateUserLoginInfo(id, data);
  }
  @Delete('deletegigmanager/:id')
  async deleteGigManager(@Param('id') id: string): Promise<string> {
    const res = await this.loginService.deleteUserLoginInfo(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  //!!---ProductManagement CRUD Part---!!
  //1.-----------------------------Category-----------------------------
  @Get('getcategory')
  async getCategory(): Promise<CategoryEntity[]> {
    const data = await this.categoryService.getCategory();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Category created yet" })
    }
    return data
  }
  @Get('getCategory/:name')
  async getCategoryByName(@Param('name') name: string): Promise<CategoryDTO[]> {
    const data = await this.categoryService.getCategoryByName(name)
    if (data.length === 0) {
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
  async getSize(): Promise<SizeEntity[]> {
    const data = await this.sizeService.getSize();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No size created yet" })
    }
    return data
  }
  @Get('getsize/:name')
  async getSizeByName(@Param() name: string): Promise<SizeDTO[]> {
    const data = await this.sizeService.getSizeByName(name)
    if (data.length === 0) {
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
  async getColor(): Promise<ColorEntity[]> {
    const data = await this.colorService.getColor();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Color created yet" })
    }
    return data
  }
  @Get('getcolor/:name')
  async getColorByName(@Param() name: string): Promise<ColorDTO[]> {
    const data = await this.colorService.getColorByName(name)
    if (data.length === 0) {
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

  //4.Product(color,size,product,band,category)
  @Get('getProduct')
  async getProduct(): Promise<ProductDetailsEntity[]> {
    const data = await this.productDetailsService.getProductDetailsWithProductInfo();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Product created yet" })
    }
    return data
  }
  @Get('getProduct/:name')
  async getProductByName(@Param() name: string): Promise<ProductEntity[]> {
    const data = await this.productService.getProductByName(name)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Product created yet" })
    }
    return data;
  }
  @Post('addProduct')
  @UsePipes(new ValidationPipe())
  async addProduct(@Body() data: ProductRegistrationDTO, @Session() session): Promise<ProductDTO> {
    const proData = new ProductDTO()
    proData.login = session.user.id
    proData.name = data.name
    proData.price = data.price
    proData.image = data.image
    proData.revenuePercentage = data.revenuePercentage
    proData.band = data.band
    proData.category = data.category
    proData.name = data.name
    const product = await this.productService.addProduct(proData)
    if (product != null) {
      for (const item of data.productDetails) {
        const color = await this.colorService.getColorById(item.colorId)
        const size = await this.sizeService.getSizeById(item.sizeId)
        if (color != null && size != null) {
          console.log(color, size)
          const newData = new ProductDetailsEntity()
          newData.color = color
          newData.size = size
          newData.quantity = item.quantity
          newData.product = product
          newData.name = product.name + ' ' + color.name + ' ' + size.name
          await this.productDetailsService.addProductDetails(newData)
        }
        else {
          throw new NotFoundException({ message: "Specific color or size not found" })
        }
      }
      return product
    }
    else {
      throw new BadRequestException({ message: "Please fill all the fields correctly" })
    }
  }
  // @Put('updateProduct/:id')
  // @UsePipes(new ValidationPipe())
  // async updateProduct(@Param('id') id: string, @Body() data: ProductDTO, @Session() session): Promise<ProductDTO> {
  //   data.login = session.user.id
  //   const product = await this.productService.updateProduct(id,data)
  //   if(product!=null){
  //     for(const item of data.productColorsMap){
  //       const res = await this.colorService.getColorById(item.id)
  //       if(res!=null){
  //         const newData = new ProductColorMapEntity()
  //         newData.color = res
  //         newData.product = product
  //         await this.productColorMapService.addProductColorMap(newData)
  //       }
  //     }
  //     for(const item of data.productSizesMap){
  //       const res = await this.sizeService.getSizeById(item.id)
  //       if(res!=null){
  //         const newData = new ProductSizeMapEntity()
  //         newData.size = res
  //         newData.product = product
  //         await this.productSizeMapService.addProductSizeMap(newData)
  //       }
  //     }
  //     return product
  //   }
  //   throw new NotFoundException({message:"Proper data for product not found"})
  // }
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
  async getBand(): Promise<BandEntity[]> {
    const data = await this.bandService.getBand();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Band created yet" })
    }
    return data
  }
  @Get('getBand/:name')
  async getBandByName(@Param() name: string): Promise<BandDTO[]> {
    const data = await this.bandService.getBandByName(name)
    if (data.length === 0) {
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
  @Get('getGig')
  async getGig(): Promise<GigEntity[]> {
    const data = await this.gigService.getGig();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Gig created yet" })
    }
    return data
  }
  @Get('getGig/:name')
  async getGigByName(@Param() name: string): Promise<GigDTO[]> {
    const data = await this.gigService.getGigByName(name)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Gig created yet" })
    }
    return data;
  }
  @Post('addGig')
  @UsePipes(new ValidationPipe())
  async addGig(@Body() data: GigDTO, @Session() session): Promise<GigDTO> {
    data.login = session.user.id
    return this.gigService.addGig(data);
  }
  @Put('updateGig/:id')
  @UsePipes(new ValidationPipe())
  updateGig(@Param('id') id: string, @Body() data: GigDTO, @Session() session): Promise<GigDTO> {
    data.login = session.user.id
    return this.gigService.updateGig(id, data);
  }
  @Delete('deleteGig/:id')
  async deleteGig(@Param('id') id: string): Promise<string> {
    const res = await this.gigService.deleteGig(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  //!!---OrderManagement---!!
  //1.Order(login,productOrderMap)---------view
  @Get('getorder')
  async getOrder(): Promise<OrderEntity[]> {
    const data = await this.orderService.getOrderWithOrderProductsMap()
    if (data.length === 0) {
      throw new NotFoundException({ message: "No order placed yet" })
    }
    return data
  }
  //add order
  @Post('addorder')
  async addOrder(@Body() data: OrderDTO, @Session() session): Promise<any> {
    data.login = session.user.id
    data.customer.login = session.user.id
    const customer = await this.customerService.addCustomer(data.customer)
    data.customer = customer
    const order = await this.orderService.addOrder(data)

    if (order != null) {
      for (const item of data.orderProducts) {
        const newData = new OrderProductsMapEntity()
        newData.order = order
        newData.orderPrice = item.productDetails.product.price
        newData.orderQuantity = item.orderQuantity
        newData.productDetails = item.productDetails
        await this.orderProductsMapService.addOrderProductsMap(newData)
        if (newData != null) {
          const exProduct = await this.productDetailsService.getProductDetailsById(item.productDetails.id)
          const newQuantity = exProduct.quantity - item.orderQuantity
          exProduct.quantity = newQuantity
          const newProduct = await this.productDetailsService.updateProductDetails(exProduct.id, exProduct)
          if (newProduct != null) {
            return order
          }
          else {
            throw new NotFoundException({ message: "Something went wrong" })
          }
        }
      }
    }
  }

  //!!---Reports---!!
  //1.Sales Report-------------------generate a PDF of total sales
  @Get('salesreport')
  async getSalesReport(): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReport()
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
  //2.Monthly revenue report---------list of products sold in spcific month
  @Get('revenuereport')
  async getRevenueReport(): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReport()
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
  //3.Bar Charts---------------------sales by 12 months
  @Get('barchart')
  async getBarChart(): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReport()
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