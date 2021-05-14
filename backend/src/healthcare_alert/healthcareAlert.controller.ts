import {Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {HealthcareAlertService} from "./healthcareAlert.service";
import {HealthcareAlert} from "./schemas/healthcareAlert.schema";
import {CreateHealthcareAlertsDto} from "./dto/create-healthcareAlerts.dto";
import {UpdateHealthcareAlertsDto} from "./dto/update-healthcareAlerts.dto";
import {DateUtil} from "../commonUtil/DateUtil";
import {E_User} from "../e_user/schemas/e_user.schema";
import {E_UserService} from "../e_user/e_User.service";


@Controller('healthcare_alert')
export class HealthcareAlertController {
  constructor(
      private readonly healthcareAlertService: HealthcareAlertService,
      private readonly e_UserService : E_UserService,
  ) {}

  @Get(':healthcareAlertId')
  async getHealthcareAlertByID(@Param('healthcareAlertId') healthcareAlertId: number): Promise<HealthcareAlert> {
    return this.healthcareAlertService.getHealthcareAlertByID(healthcareAlertId);
  }

  @Get()
  async getAllHealthCareAlerts(): Promise<HealthcareAlert[]> {
      console.log("get all healthcare alerts...");
      return this.healthcareAlertService.getAllHealthcareAlerts();
  }

  @Post()
  async createNewHealthcareAlerts(@Body() dto: CreateHealthcareAlertsDto): Promise<HealthcareAlert> {
      const date : Date = DateUtil.convertStrToDate(dto.date);
      const e_user: E_User = await this.e_UserService.getEnterpriseUserById(dto.e_nric);
      if(e_user === null) {
          const errorMsg = "enterpise nric invalid. user is trying to enter enterprise nric which doesnt exist in record.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else if(date === null){
          const errorMsg = "date is invalid. please review the date string before sending.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else {
          console.log("healthcare DTO received successfully...")
          return this.healthcareAlertService.createNewHealthcareAlerts(
              date,
              dto.location_id,
              dto.description,
              dto.e_nric,
          );
      }
  }

  @Patch(':healthcareAlertId')
  async updateHealthcareAlerts(@Param('healthcareAlertId') healthcareAlertId: number, @Body() updateDto: UpdateHealthcareAlertsDto): Promise<HealthcareAlert> {
      const date : Date = DateUtil.convertStrToDate(updateDto.date);
      if(date === null){
          const errorMsg = "date is invalid. please review the date string before sending.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else {
          return this.healthcareAlertService.updateHealthcareAlertByID(healthcareAlertId, updateDto);
      }
  }

}
