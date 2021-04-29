import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateP_UserDto } from './dto/create-p_user.dto';
import { p_user} from './schemas/p_user.schema';
import { P_UserService } from './p_user.service';




@Controller('p_user')
export class P_UserController {
  constructor(private readonly P_UserService: P_UserService) {}


  // single row without 's'
  @Get(':p_nric')
  async getP_User(@Param('p_nric') p_nric: string): Promise<p_user> {
    return this.P_UserService.getP_UserById(p_nric);
  }

  //Multiple row with 's'
  @Get()
  async getP_Users(): Promise<p_user[]> {
      console.log("Retrieve public user information");
      return this.P_UserService.getP_User();
  }

  //Take note two DTO varia with different cap
  @Post()
  async createP_User(@Body() createP_UserDto: CreateP_UserDto): Promise<p_user> {
      console.log("public user DTO received successfully...")
      return this.P_UserService.createP_User(createP_UserDto.p_nric,createP_UserDto.firstname,createP_UserDto.lastname,createP_UserDto.covid_status)
  }





}
