import { BadRequestException, Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Session, Delete, NotFoundException, Patch, ForbiddenException, Res, Query, ConflictException, ParseIntPipe, HttpStatus } from "@nestjs/common";
import { SizeDTO } from "src/models/size/size.dto";
import { SizeService } from "src/models/size/size.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { ColorDTO } from "src/models/color/color.dto";
import * as fs from 'fs-extra';
import * as bcrypt from 'bcrypt';
import { UserProfileDTO } from "src/models/userProfile/userProfile.dto";
import { ChangePassword, LoginDTO, LoginRegistrationDTO, LoginUpdateDTO } from "src/models/login/login.dto";
import { LoginService } from "src/models/login/login.service";
import { SessionAdminGuard } from "./sessionAdminGaurd.gaurd";
import { UserProfileService } from "src/models/userProfile/userProfile.service";
import { ProductDTO, ProductRegistrationDTO } from "src/models/product/product.dto";
import { ProductService } from "src/models/product/product.service";
import { OrderService } from "src/models/order/order.service";
import { CategoryDTO } from "src/models/category/category.dto";
import { CategoryService } from "src/models/category/category.service";
import { ColorService } from "src/models/color/color.service";
import { BandService } from "src/models/band/band.service";
import { BandDTO } from "src/models/band/band.dto";
import { LoginEntity } from "src/models/login/login.entity";
import { GigService } from "src/models/gig/gig.service";
import { GigDTO } from "src/models/gig/gig.dto";
import { OrderProductsMapService } from "src/models/orderProductsMap/orderProductsMap.service";
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
import { ProductDetailsDTO, ProductRegistrationDetailsDTO } from "src/models/productDetails/productDetails.dto";
import { AuthService } from "src/auth/auth.service";
import { CommonService } from "src/common/common.service";
import { BandManagerEntity } from "src/models/bandManager/bandManager.entity";
import { BandManagerService } from "src/models/bandManager/bandManager.service";
import { GigManagerEntity } from "src/models/gigManager/gigManager.entity";
import { GigManagerService } from "src/models/gigManager/gigManager.service";
import { BandManagerDTO } from "src/models/bandManager/bandManager.dto";
import { GigManagerDTO } from "src/models/gigManager/gigManager.dto";
import { DesignationService } from "src/models/designation/designation.service";
import { DesignationEntity } from "src/models/designation/designation.entity";
import { DesignationDTO } from "src/models/designation/Designation.dto";


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
    private readonly customerService: CustomerService,
    private readonly commonService: CommonService,
    private readonly bandMService: BandManagerService,
    private readonly gigMService: GigManagerService,
    private readonly designationService: DesignationService
  ) { }

  //Change Password
  @Patch('changepassword')
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
    const destinationDir = './uploads/userProfile';
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
    });
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
          cb(null, `${name}.${file.originalname.split('.')[1]}`);
        },
      }),
    })
  )
  async updateUserProfile(@UploadedFile() myfileobj: Express.Multer.File, @Body() data: UserProfileDTO, @Session() session) {
    if (myfileobj != null || myfileobj.size > 0) {
      const newFileName = `${session.user.id}.${myfileobj.originalname.split('.')[1]}`;
      const destinationDir = './uploads/userProfile';
      const filePath = `${destinationDir}/${newFileName}`;
      data.image = newFileName
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }
      await fs.promises.rename(myfileobj.path, filePath);
    }
    const exdata = await this.userProfileService.getUserProfileByLoginInfo(session.user.id)
    return this.userProfileService.updateUserProfile(exdata.id, data);
  }

  @Get('getuserprofile/:id')
  //async GetUserProfile(@Session() session) {
  async GetUserProfile(@Param('id') id: string) {
    const data = await this.userProfileService.getUserProfileByLoginInfo(id)
    if (data == null) {
      throw new NotFoundException({ message: "No user profile created yet" })
    }
    else {
      const url = 'http://localhost:3000/admin/getimage/?type=userProfile&image='
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
    const res = this.loginService.addUserLoginInfo(data).catch(err => {
      throw new ConflictException({
        message: err.message
      });
    });

    if (res != null) {
      return this.authService.sendLoginInfoMail(lastID, password, data.email)
    }
    return false
  }

  @Get('getadmin/:id')
  async getAdmin(@Param('id') id: string): Promise<LoginEntity> {
    const userType = 'admin'
    const data = await this.loginService.getUserLoginInfoByUserTypeWithLoginInfo(id, userType);
    if (data == null) {
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

  @Get('getadminbyname/:name?')
  async getAdminByName(@Param('name') name: string): Promise<LoginDTO[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const userType = 'admin'
    const data = await this.loginService.getUserLoginInfoByName(searchingName, userType)
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
    const res = this.loginService.addUserLoginInfo(data).catch(err => {
      throw new ConflictException({
        message: err.message
      });
    });

    if (res != null) {
      return this.authService.sendLoginInfoMail(lastID, password, data.email)
    }
    return false
  }

  @Get('getemployeebyname/:name?')
  async getEmployeeByName(@Param('name') name: string): Promise<LoginDTO[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const userType = 'employee'
    const data = await this.loginService.getUserLoginInfoByName(searchingName, userType)
    return data;
  }

  @Get('getemployee/:id')
  async getEmployeeById(@Param('id') id: string): Promise<LoginEntity> {
    const userType = 'employee'
    const data = await this.loginService.getUserLoginInfoByUserTypeWithLoginInfo(id, userType);
    if (data == null) {
      throw new NotFoundException({ message: "No Admin created yet" })
    }
    return data
  }

  @Get('getallemployee')
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
  async addBandManager(@Body() data: LoginRegistrationDTO, bandId: string, @Session() session): Promise<boolean> {
    const band = await this.bandService.getBandById(bandId)
    if (band == null) {
      throw new NotFoundException({ message: `No band found with ID: ${bandId}` })
    }
    else {
      const lastID = await this.loginService.findLastUserLoginId();
      const password = Date.now() + '$' + data.phoneNumber

      data.id = lastID
      data.password = await this.loginService.getHassedPassword(password)
      data.userType = 'bandmanager'
      const res = await this.loginService.addUserLoginInfo(data).catch(err => {
        throw new ConflictException({
          message: err.message
        });
      });

      if (res != null) {
        const bandM = new BandManagerEntity
        bandM.band = band
        bandM.bandManager = res
        bandM.login = session.user.id
        await this.bandMService.addBandManager(bandM)
        return this.authService.sendLoginInfoMail(lastID, password, data.email)
      }
    }
  }

  @Get('getbandmanagerbyname/:name?')
  async getBandManagerByName(@Param('name') name: string): Promise<BandManagerEntity[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.bandMService.getBandManagerByBandMName(searchingName)
    return data;
  }

  @Get('getbandmanager/:id')
  async getBandManager(@Param('id') id: string): Promise<BandManagerEntity> {
    const data = await this.bandMService.getBandManagerWithUserandLoginInfo(id);
    if (data == null) {
      throw new NotFoundException({ message: "No bandmanager created yet" })
    }
    return data
  }
  @Put('updateuser/:id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() data: LoginUpdateDTO, @Session() session): Promise<LoginEntity> {
    return await this.loginService.updateUserLoginInfo(id, data)
  }
  @Put('updatebandmanager/:id')
  @UsePipes(new ValidationPipe())
  async updateBandManager(@Param('id') id: string, @Body() data: BandManagerDTO, @Session() session): Promise<BandManagerEntity> {
    data.login = session.user
    console.log(data, data)
    return this.bandMService.updateBandManager(id, data);
  }
  @Delete('deletebandmanager/:id')
  async deleteBandManager(@Param('id') id: string): Promise<string> {
    const res = await this.bandMService.deleteBandManager(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  //4.Gig Manager(login,gig,gigManager)-------->status:true(admin approval)
  @Post('addgigmanager')
  @UsePipes(new ValidationPipe())
  async addGigManager(@Body() data: LoginRegistrationDTO, gigId: string, @Session() session): Promise<boolean> {
    const gig = await this.gigService.getGigById(gigId)
    if (gig == null) {
      throw new NotFoundException({ message: `No gig found with ID: ${gigId}` })
    }
    else {
      const lastID = await this.loginService.findLastUserLoginId();
      const password = Date.now() + '$' + data.phoneNumber

      data.id = lastID
      data.password = await this.loginService.getHassedPassword(password)
      data.userType = 'gigmanager'
      const res = await this.loginService.addUserLoginInfo(data).catch(err => {
        throw new ConflictException({
          message: err.message
        });
      });

      if (res != null) {
        const gigM = new GigManagerEntity
        gigM.gig = gig
        gigM.gigManager = res
        gigM.login = session.user.id
        await this.gigMService.addGigManager(gigM)
        return this.authService.sendLoginInfoMail(lastID, password, data.email)
      }
    }
  }

  // @Get('getadmin/:id')
  // async getAdmin(@Param('id') id: string): Promise<LoginEntity> {
  //   const userType = 'admin'
  //   const data = await this.loginService.getUserLoginInfoByUserTypeWithLoginInfo(id, userType);
  //   if (data == null) {
  //     throw new NotFoundException({ message: "No Admin created yet" })
  //   }
  //   return data
  // }

  @Get('getGigmanager/:name?')
  async getGigManagerByName(@Param('name') name: string): Promise<GigManagerEntity[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.gigMService.getGigManagerByUserName(searchingName)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Admin found" })
    }
    return data;
  }

  @Get('getGigmanager')
  async getGigManager(): Promise<GigManagerEntity[]> {
    const userType = 'Gigmanager'
    const data = await this.gigMService.getGigManagerWithUserInfo();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Gigmanager created yet" })
    }
    return data
  }
  @Put('updateGigmanager/:id')
  @UsePipes(new ValidationPipe())
  updateGigManager(@Param('id') id: string, @Body() data: GigManagerDTO, @Session() session): Promise<GigManagerEntity> {
    data.login = session.user
    data.gigManager.userType = 'Gigmanager'
    return this.gigMService.updateGigManager(id, data);
  }
  @Delete('deleteGigmanager/:id')
  async deleteGigManager(@Param('id') id: string): Promise<string> {
    const res = await this.gigMService.deleteGigManager(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }

  //!!---ProductManagement CRUD Part---!!
  //1.-----------------------------Category-----------------------------
  @Get('getcategorybyid/:id')
  async getCategory(@Param('id') id: string): Promise<CategoryEntity> {
    const data = await this.categoryService.getCategoryWithLoginId(id);
    if (data == null) {
      throw new NotFoundException({ message: "No Category created yet" })
    }
    return data
  }
  @Get('getallcategory')
  async getAllCategory(): Promise<CategoryEntity[]> {
    const data = await this.categoryService.getCategory();
    return data
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
  @Post('addcategory')
  @UsePipes(new ValidationPipe())
  async addCategory(@Body() data: CategoryDTO, @Session() session): Promise<CategoryEntity> {
    data.login = session.user.id
    console.log(data)
    return await this.categoryService.addCategory(data)
  }
  @Put('updatecategory/:id')
  @UsePipes(new ValidationPipe())
  async updateCategory(@Param('id') id: string, @Body() data: CategoryDTO, @Session() session): Promise<CategoryEntity> {
    data.login = session.user.id
    return await this.categoryService.updateCategory(id, data);
  }
  @Delete('deletecategory/:id')
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
  @Get('getsizefordropdown')
  async getSizeForDDown(): Promise<SizeEntity[]> {
    const data = await this.sizeService.getSize();
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
  @Post('addsize')
  @UsePipes(new ValidationPipe())
  async addSize(@Body() data: SizeDTO, @Session() session): Promise<SizeDTO> {
    data.login = session.user.id
    const resdata = await this.sizeService.addSize(data)
    return resdata
  }
  @Put('updatesize/:id')
  @UsePipes(new ValidationPipe())
  async updateSize(@Param('id') id: string, @Body() data: SizeDTO, @Session() session): Promise<SizeEntity> {
    data.login = session.user.id
    return await this.sizeService.updateSize(id, data);
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
  @Get('getcolor/:id')
  async getColor(@Param('id') id: string): Promise<ColorEntity> {
    const data = await this.colorService.getColorByIdWithLoginInfo(id);
    if (data != null) {
      return data
    }
    else {
      throw new NotFoundException({ message: "No Color created yet" })
    }
  }

  @Get('getcolorfordropdown')
  async getColorForDDown(): Promise<ColorEntity[]> {
    const data = await this.colorService.getColor();
    return data
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
  @Post('addcolor')
  @UsePipes(new ValidationPipe())
  async addColor(@Body() data: ColorDTO, @Session() session): Promise<ColorEntity> {
    data.login = session.user.id
    return this.colorService.addColor(data)
  }
  @Put('updatecolor/:id')
  @UsePipes(new ValidationPipe())
  updateColor(@Param('id') id: string, @Body() data: ColorDTO, @Session() session): Promise<ColorEntity> {
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
  @Get('getProductdetails/:id')
  async getProductDetails(@Param('id') id: string): Promise<ProductEntity> {
    const data = await this.productService.getProductByIdWithAllInfo(id);
    //console.log(id, data)
    return data
  }
  @Get('getProduct/:name?')
  async getProductByName(@Param('name') name: string): Promise<ProductEntity[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.productService.getProductByName(searchingName)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Product created yet" })
    }
    console.log(data)
    return data;
  }
  @Get('getProductforaddition/:name?')
  async getProductForAddition(@Param('name') name: string): Promise<ProductEntity[]> {
    console.log(name)
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.productService.getProductByName(searchingName)
    return data;
  }
  @Get('getallproducts')
  async getAllProducts(): Promise<ProductEntity[]> {
    const data = await this.productService.getProduct()
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Product created yet" })
    }
    return data;
  }

  @Post('addproductwithpreviousinfo')
  @UsePipes(new ValidationPipe())
  async addProductWithPrevInfo(@Body() data: ProductRegistrationDetailsDTO, @Session() session): Promise<ProductDetailsEntity> {
    const product = await this.productService.getProductById(data.productId)
    const color = await this.colorService.getColorById(data.colorId)
    const size = await this.sizeService.getSizeById(data.sizeId)
    if (color != null && size != null && product != null) {
      const newData = new ProductDetailsEntity()
      newData.color = color
      newData.size = size
      newData.quantity = data.quantity
      newData.product = product
      newData.name = product.name + ' ' + color.name + ' ' + size.name
      return await this.productDetailsService.addProductDetails(newData)
    }
    else {
      throw new NotFoundException({ message: "Specific color or size not found" })
    }
  }
  @Post('addnewproduct')
  @UsePipes(new ValidationPipe())
  async addNewProduct(@Body() data: ProductRegistrationDTO, @Session() session): Promise<ProductDetailsDTO> {
    try {
      console.log("Received data:", data);

      const proData = new ProductDTO();
      proData.name = data.name;
      proData.band = data.band;
      proData.category = data.category;
      proData.price = data.price;
      proData.revenuePercentage = data.revenuePercentage;
      proData.login = session.user;

      console.log("proData:", proData);

      const product = await this.productService.addProduct(proData);

      console.log("Product:", product);

      if (product !== null) {
        const newData = new ProductDetailsEntity();
        newData.color = data.productDetails.color;
        newData.size = data.productDetails.size;
        newData.quantity = data.productDetails.quantity;
        newData.product = product;
        newData.name = product.name + ' ' + data.productDetails.color.name + ' ' + data.productDetails.size.name;

        console.log("newData:", newData);

        const result = await this.productDetailsService.addProductDetails(newData);

        console.log("Result:", result);

        return result;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }


  // @Post('addProduct')
  // @UsePipes(new ValidationPipe())
  // async addProduct(@Body() data: ProductRegistrationDTO, @Session() session): Promise<ProductDTO> {
  //   const proData = new ProductDTO()
  //   proData.login = session.user.id
  //   proData.name = data.name
  //   proData.price = data.price
  //   proData.revenuePercentage = data.revenuePercentage
  //   proData.band = data.band
  //   proData.category = data.category

  //   const product = await this.productService.addProduct(proData)
  //   if (product != null) {
  //     for (const item of data.productDetails) {
  //       const color = await this.colorService.getColorById(item.colorId)
  //       const size = await this.sizeService.getSizeById(item.sizeId)
  //       if (color != null && size != null) {
  //         const newData = new ProductDetailsEntity()
  //         newData.color = color
  //         newData.size = size
  //         newData.quantity = item.quantity
  //         newData.product = product
  //         newData.name = product.name + ' ' + color.name + ' ' + size.name
  //         await this.productDetailsService.addProductDetails(newData)
  //       }
  //       else {
  //         await this.productService.deleteProduct(product.id)
  //         throw new NotFoundException({ message: "Specific color or size not found" })
  //       }
  //     }
  //     return product
  //   }
  //   else {
  //     throw new BadRequestException({ message: "Please fill all the fields correctly" })
  //   }
  // }

  @Put('updateProduct/:id')
  @UsePipes(new ValidationPipe())
  async updateProduct(@Param('id') id: string, @Body() data: ProductDetailsDTO, @Session() session): Promise<ProductDetailsDTO> {
    data.product.login = session.user.id
    return this.productDetailsService.updateProductDetails(id, data)
  }
  @Delete('deleteProduct/:id')
  async deleteProduct(@Param('id') id: string): Promise<string> {
    const res = await this.productDetailsService.deleteProductDetails(id);
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
    else {
      const url = 'http://localhost:3000/admin/getimage/?type=band&image='
      for (const item of data) {
        const img=item.image
        item.image = url + img
      }
      return data
    }
  }
  @Get('getBandfordropdown')
  async getBandForDropDOwn(): Promise<BandEntity[]> {
    const data = await this.bandService.getBandforDropdown();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Band created yet" })
    }
    return data
  }
  @Get('getBand/:name?')
  async getBandByName(@Param('name') name: string): Promise<BandDTO[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.bandService.getBandByNameWithLoginInfo(searchingName)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Band created yet" })
    }
    else {
      const url = 'http://localhost:3000/admin/getimage/?type=band&image='
      for (const item of data) {
        item.image = url + item.image
      }
      return data;
    }
  }
  @Post('addBand')
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
        destination: './temp/band',
        filename: function (req, file, cb) {
          let name = req.body.name;
          cb(null, `${name}.${file.originalname.split('.')[1]}`);
        },
      }),
    })
  )
  async addBand(@UploadedFile() myfileobj: Express.Multer.File, @Body() data: BandDTO, @Session() session): Promise<BandDTO> {

    if (!myfileobj || myfileobj.size == 0) {
      throw new BadRequestException('Empty file');
    }
    const newFileName = `${data.name}.${myfileobj.originalname.split('.')[1]}`;
    const destinationDir = './uploads/band';
    const filePath = `${destinationDir}/${newFileName}`;
    data.image = newFileName
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }
    await fs.promises.rename(myfileobj.path, filePath);
    data.login = session.user.id
    console.log(data)
    return this.bandService.addBand(data).catch(err => {
      throw new ConflictException({
        message: err.message
      });
    });
  }
  @Put('updateBand/:id')
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
        destination: './temp/band',
        filename: function (req, file, cb) {
          let name = req.body.name;
          cb(null, `${name}.${file.originalname.split('.')[1]}`);
        },
      }),
    })
  )
  async updateBand(@Param('id') id: string, @Body() data: BandDTO, @Session() session, @UploadedFile() myfileobj: Express.Multer.File): Promise<BandDTO> {
    if (myfileobj != null || myfileobj.size > 0) {
      const newFileName = `${data.name}.${myfileobj.originalname.split('.')[1]}`;
      const destinationDir = './uploads/band';
      const filePath = `${destinationDir}/${newFileName}`;
      data.image = newFileName
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }
      await fs.promises.rename(myfileobj.path, filePath);
    }
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
  @Get('getgig/:id')
  async getGig(@Param('id') id: string): Promise<GigEntity> {
    const data = await this.gigService.getGigById(id);
    if (data == null) {
      throw new NotFoundException({ message: "No Gig created yet" })
    }
    return data
  }
  @Get('getallgigs')
  async getAllGig(): Promise<GigEntity[]> {
    const data = await this.gigService.getGig();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Gig created yet" })
    }
    return data
  }
  @Get('getGig/:name?')
  async getGigByName(@Param('name') name: string): Promise<GigDTO[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.gigService.getGigByName(searchingName)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Gig created yet" })
    }
    return data;
  }
  @Post('addGig')
  @UsePipes(new ValidationPipe())
  async addGig(@Body() data: GigDTO, @Session() session): Promise<GigDTO> {
    data.login = session.user.id
    return this.gigService.addGig(data).catch(err => {
      throw new ConflictException({
        message: err.message
      });
    });
  }
  @Put('updateGig/:id')
  @UsePipes(new ValidationPipe())
  async updateGig(@Param('id') id: string, @Body() data: GigDTO, @Session() session): Promise<GigDTO> {
    data.login = session.user.id
    return await this.gigService.updateGig(id, data);
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

  //---Reports---!!
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
  @Get('report')
  async getReport(): Promise<any> {
    return this.orderProductsMapService.getSalesReport()
  }
  @Get('salesreport/:month')
  async getSalesReportForSpecificMonth(@Param('month', ParseIntPipe) month: number): Promise<any> {
    const data = await this.orderProductsMapService.getOrderProductsMapWithReport()
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

  @Get('getcount')
  async getAllsCount(): Promise<object> {
    const adminCount = await this.loginService.getUserTypeCount("admin");
    const employeeCount = await this.loginService.getUserTypeCount("employee");
    const bandManagerCount = await this.bandMService.getCount();
    const gigManagerCount = await this.gigMService.getCount();
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


  //--------configaration----------
  //3.-----------------------------Designation-----------------------------
  @Get('getdesignation/:id')
  async getDesignation(@Param('id') id: string): Promise<DesignationEntity> {
    const data = await this.designationService.getDesignationByUserId(id);
    if (data == null) {
      throw new NotFoundException({ message: "No Designation created yet" })
    }
    return data
  }
  @Get('getalldesignations')
  async getAllDesignations(): Promise<DesignationEntity[]> {
    const data = await this.designationService.getDesignation();
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Designation created yet" })
    }
    return data
  }
  @Get('getdesignationbyname/:name?')
  async getDesignationByName(@Param('name') name: string): Promise<DesignationEntity[]> {
    const searchingName = name == undefined ? '%' : name + '%'
    const data = await this.designationService.getDesignationByName(searchingName)
    if (data.length === 0) {
      throw new NotFoundException({ message: "No Designation created yet" })
    }
    return data;
  }
  @Post('adddesignation')
  @UsePipes(new ValidationPipe())
  async addDesignation(@Body() data: DesignationDTO, @Session() session): Promise<DesignationEntity> {
    data.updater = session.user.id
    return this.designationService.addDesignation(data).catch(err => {
      throw new ConflictException({
        message: err.message
      });
    });
  }
  @Put('updatedesignation/:id')
  @UsePipes(new ValidationPipe())
  updateDesignation(@Param('id') id: string, @Body() data: DesignationDTO, @Session() session): Promise<DesignationEntity> {
    data.updater = session.user.id
    return this.designationService.updateDesignation(id, data);
  }
  @Delete('deletedesignation/:id')
  async deleteDesignation(@Param('id') id: string): Promise<string> {
    const res = await this.designationService.deleteDesignation(id);
    if (res['affected'] > 0) {
      return "ID: " + id + " deleted successfully"
    }
    return "ID: " + id + " couldnot delete, something went wrong"
  }
}