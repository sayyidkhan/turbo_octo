import {Body, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {CreateCtracingDto} from './dto/create-ctracing.dto';
import {c_tracing} from './schemas/ctracing.schema';
import {CtracingService} from './ctracing.service';
import {P_UserService} from "../p_user/p_user.service";
import {LocationService} from "../location/location.service";
import {p_user} from "../p_user/schemas/p_user.schema";
import {Location} from "../location/schemas/location.schema";
import {ViewCtracingDto} from "./dto/view-ctracing.dto";
import {DateUtil} from "../commonUtil/DateUtil";
import {CompositeCtracingService} from "./CompositeCtracing.service";


@Controller('c_tracing')
export class CtracingController {
  constructor(
      private readonly CtracingService: CtracingService,
      private readonly p_UserService: P_UserService,
      private readonly locationService : LocationService,
      private readonly compositeCtracingService : CompositeCtracingService,
  ) {}

  @Get(':ct_id')
  async getCtracing(@Param('ct_id') ct_id: number): Promise<c_tracing> {
    return this.CtracingService.getCtracingById(ct_id);
  }

  @Get("searchbynric/:nric")
  async getCtracingByNric(@Param('nric') nric : string) : Promise<ViewCtracingDto[]> {
      console.log("get contract tracing by nric: " + nric);
      return this.compositeCtracingService.getCtracingByNric(nric);
  }

  @Get()
  async getCtracings(): Promise<c_tracing[]> {
      console.log("get all contact tracing..");
      return this.CtracingService.getCtracing();
  }

  @Post()
  async createCtracing(@Body() dto: CreateCtracingDto): Promise<c_tracing> {
      const locationId : number = dto.location_id;
      const p_nric : string = dto.p_nric;
      console.log(dto.date);
      const v_date : Date = DateUtil.convertStrToDate(dto.date);
      //check if public / location_id is valid first
      const p_user: p_user = await this.p_UserService.getP_UserById(p_nric);
      const location: Location = await this.locationService.getLocationById(locationId);
      if (p_user === null) {
          const errorMsg = "public nric invalid. user is trying to enter public nric which doesnt exist in record.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else if(location === null){
          const errorMsg = "location id is invalid. user is trying to enter a location which doesnt exist in record.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else if(v_date === null){
          const errorMsg = "date is invalid. please review the date string before sending.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else {
          console.log("contact tracing DTO received successfully...");
          return this.CtracingService.createCtracing(
              dto.p_nric,
              dto.location_id,
              v_date);
      }
  }

}
