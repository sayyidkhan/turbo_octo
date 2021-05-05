import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {AlertListDto} from "./dto/alert-list.dto";

import { AlertList } from './schemas/alertList.schema';
import { AlertListService } from './alertList.service';
import {CompositeAlertListService} from "./compositeAlertList.service";
import {UserAlertListDto} from "./dto/user-alert-list.dto";


@Controller('alertlist')
export class AlertListController {
  constructor(
      private readonly alertListService: AlertListService,
      private readonly compositeAlertListService : CompositeAlertListService) {}

  @Get(':alert')
  async getAlertListById(@Param('alert') alertId: number): Promise<AlertList> {
    return this.alertListService.getAlertById(alertId);
  }

  //get only active list
  @Get('/filterlist/true')
  async getAllActiveAlertList(): Promise<UserAlertListDto[]> {
      console.log("get only active alerts...");
      return this.compositeAlertListService.getOnlyActiveAlerts();
  }

  @Get()
  async getAllAlertList(): Promise<AlertList[]> {
      console.log("get all alerts...");
      return this.alertListService.getAllAlerts();
  }

  @Post()
  async createAlert(@Body() createAlertListDto: AlertListDto): Promise<AlertList> {
      console.log("alertList DTO received successfully...");
      return this.alertListService.createAlert(
          createAlertListDto.alertTitle,
          createAlertListDto.alertDetail,
          createAlertListDto.alertDate,
          createAlertListDto.active,
          createAlertListDto.location_id);
  }

  @Patch(':alert')
  async updateAlertListById(@Param('alert') alertId : number, @Body() alertListDto: AlertListDto): Promise<AlertList> {
      return this.alertListService.updateAlertById(alertId, alertListDto);
  }

  @Delete(':alert')
  async deleteAlertListByAlertId(@Param('alert') alertId: number): Promise<number> {
      console.log("deleted alertId:" + alertId);
      const alertList : AlertList = await this.alertListService.deleteAlertListById(alertId);
      if(alertList != null) {
          return alertList.alertListId;
      }
      throw new HttpException("unable to find alert to delete",HttpStatus.BAD_REQUEST);
  }

}
