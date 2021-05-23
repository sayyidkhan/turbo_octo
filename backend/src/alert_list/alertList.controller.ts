import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {AlertListDto, PersistAlertListDto, ViewAlertListDto} from "./dto/alert-list.dto";

import { AlertList } from './schemas/alertList.schema';
import { AlertListService } from './alertList.service';
import {CompositeAlertListService} from "./compositeAlertList.service";
import {P_userAlertListDto} from "./dto/p_user-alert-list.dto";
import {LocationService} from "../location/location.service";
import {Location} from "../location/schemas/location.schema";
import {DateUtil} from "../commonUtil/DateUtil";


@Controller('alertlist')
export class AlertListController {
  constructor(
      private readonly alertListService: AlertListService,
      private readonly locationService : LocationService,
      private readonly compositeAlertListService : CompositeAlertListService) {}

  @Get(':alert')
  async getAlertListById(@Param('alert') alertId: number): Promise<AlertList> {
    return this.alertListService.getAlertById(alertId);
  }

  //get only active list
  @Get('/filterlist/true')
  async getAllActiveAlertList(): Promise<P_userAlertListDto[]> {
      console.log("get only active alerts...");
      return this.compositeAlertListService.getOnlyActiveAlerts();
  }

  @Get()
  async getAllAlertList(): Promise<ViewAlertListDto[]> {
      console.log("get all alerts...");
      return this.compositeAlertListService.getAllAlertListDTO();
  }

  @Post()
  async createAlert(@Body() dto: AlertListDto): Promise<AlertList> {
      const locationId : number = dto.location_id;
      const date : Date = DateUtil.convertStrToDate(dto.alertDate);
      //check if location_id is valid first
      const location: Location = await this.locationService.getLocationById(locationId);
      if(location === null) {
          const errorMsg = "location id is invalid. user is trying to enter a location which doesnt exist in record.";
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
          console.log("alertList DTO received successfully...");
          return this.alertListService.createAlert(
              dto.alertTitle,
              dto.alertDetail,
              date,
              dto.active,
              dto.location_id,
          );
      }
  }

  @Patch(':alert')
  async updateAlertListById(@Param('alert') alertId : number, @Body() dto: AlertListDto): Promise<AlertList> {
      const locationId : number = dto.location_id;
      const date : Date = DateUtil.convertStrToDate(dto.alertDate);
      //check if location_id is valid first
      const location: Location = await this.locationService.getLocationById(locationId);
      const alert : AlertList = await this.alertListService.getAlertById(alertId);
      if(alert === null){
          const errorMsg = "alert id is invalid. user is trying to update a alertId which doesnt exist in record.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else if(location === null) {
          const errorMsg = "location id is invalid. user is trying to update a location which doesnt exist in record.";
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
          console.log("alertList DTO received successfully...");
          const persistence: PersistAlertListDto = new PersistAlertListDto(dto);
          return this.alertListService.updateAlertById(alertId, persistence);
      }
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

    @Get('alertlist_by_district/:district')
    async getalertListByDistrict(@Param('district') district : string): Promise<ViewAlertListDto[]> {
      const result: Promise<ViewAlertListDto[]> = this.compositeAlertListService.getAlertListByDistrict(district);
      return result;
    }

    @Get('alertlist_by_locationid/:location_id')
    async getalertListByLocationId(@Param('location_id') location_id : number): Promise<ViewAlertListDto[]> {
        const result: Promise<ViewAlertListDto[]> = this.compositeAlertListService.getAlertListByLocationId(location_id);
        return result;
    }

}
