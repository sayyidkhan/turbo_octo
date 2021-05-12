import {Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CreateP_UserDto} from './dto/create-p_user.dto';
import {p_user} from './schemas/p_user.schema';
import {P_UserService} from './p_user.service';
import {UpdatePublicUserDto} from "./dto/update_public_user_dto";


@Controller('p_user')
export class P_UserController {
  constructor(private readonly P_UserService: P_UserService) {}

  @Get(':p_nric')
  async getP_User(@Param('p_nric') p_nric: string): Promise<p_user> {
    return this.P_UserService.getP_UserById(p_nric);
  }

  @Get()
  async getP_Users(): Promise<p_user[]> {
      console.log("Retrieve public user information");
      return this.P_UserService.getP_User();
  }

  @Post()
  async createP_User(@Body() createP_UserDto: CreateP_UserDto): Promise<p_user> {
      console.log("public user DTO received successfully...")
      return this.P_UserService.createP_User(
          createP_UserDto.p_nric,
          createP_UserDto.firstname,
          createP_UserDto.lastname,
          createP_UserDto.covid_status
      );
  }

    @Patch(':e_nric')
    async updateEnterpriseUser(@Param('e_nric') eNRIC: string, @Body() dto: UpdatePublicUserDto): Promise<p_user> {
        const p_user :p_user = await this.P_UserService.getP_UserById(eNRIC);
        //if e_user returns null, user is trying to update record that does not exist in db
        if(p_user === null) {
            const errorMsg : string = "public nric does not exist.";
            throw new HttpException(
                errorMsg,
                HttpStatus.BAD_REQUEST);
        }
        else {
             return this.P_UserService.updatePublicUser(eNRIC, dto);
        }
    }

}
