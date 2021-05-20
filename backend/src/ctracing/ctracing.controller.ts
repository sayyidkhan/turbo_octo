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
import {
    ReportMonthlyComputeCtracingDto,
    ReportMonthlyQueryCtracingDto,
    ReportWeeklyQueryCtracingDto
} from "./dto/report-ctracing.dto";
import {Ctracing_reportService} from "./ctracing_report.service";
import {SweeperUtil} from "../commonUtil/SweeperUtil";

@Controller('c_tracing')
export class CtracingController {
  constructor(
      private readonly CtracingService: CtracingService,
      private readonly p_UserService: P_UserService,
      private readonly locationService : LocationService,
      private readonly ctracing_reportService : Ctracing_reportService,
  ) {}

  @Get(':ct_id')
  async getCtracing(@Param('ct_id') ct_id: number): Promise<c_tracing> {
    return this.CtracingService.getCtracingById(ct_id);
  }

  @Get("/searchbynric/:p_nric")
  async getCtracingByNric(@Param('p_nric') p_nric : string) : Promise<ViewCtracingDto[]> {
      console.log("get contract tracing by nric: " + p_nric);
      const cTracingList : c_tracing[] = await this.CtracingService.getCtracingByNric(p_nric);
      const locationListDict: {} = await this.locationService.getAllLocationDict();
      const dto : ViewCtracingDto[] = cTracingList.map((c_tracing : c_tracing) => {
          const date : string = c_tracing.date.toLocaleString();
          const location : Location = locationListDict[c_tracing.location_id];
          const locationName = location.location_name;
          return new ViewCtracingDto(c_tracing.p_nric,locationName,date);
      });
      return dto;
  }

  @Get()
  async getCtracings(): Promise<ViewCtracingDto[]> {
      console.log("get all contact tracing..");
      const c_tracingList : c_tracing[] = await this.CtracingService.getCtracingByLatestId();
      const locationListDict: {} = await this.locationService.getAllLocationDict();

      const convertDateToStr = (date : Date) =>  (date === undefined) ? "" : date.toISOString();
      //process record
      const result : ViewCtracingDto[] = c_tracingList.map((c_tracing : c_tracing) => {
        const location : Location =  locationListDict[c_tracing.location_id];

          const dto = new ViewCtracingDto(
              c_tracing.p_nric,
              SweeperUtil.assignLocationName(location),
              convertDateToStr(c_tracing.date));
        return dto;
      });
      //filter bad data
      const filterResult = result.filter((dto) => {
          return dto.location_name !== "undefined";
      })
      return filterResult;
  }

  @Get('ctracing_by_district/:district')
  async getCtracingsByDistrict(@Param('district') district : string) {
      const c_tracingList : c_tracing[] = await this.CtracingService.getCtracingByLatestId();
      const locationListDict: {} = await this.locationService.getLocationByDistrict(district);
      const convertDateToStr = (date : Date) =>  (date === undefined) ? "" : date.toISOString();
      const result = c_tracingList
          .filter((c_tracing : c_tracing) => {
              const location : Location = locationListDict[c_tracing.location_id];
              return location !== undefined;
          })
          .map((c_tracing : c_tracing) => {
              const location : Location = locationListDict[c_tracing.location_id];
              const dto = new ViewCtracingDto(
                  c_tracing.p_nric,
                  location.location_name,
                  convertDateToStr(c_tracing.date));
              return dto;
          });
      return result;
  }

  @Get('ctracing_by_locationid/:location_id')
  async  getCtracingsByLocationId(@Param('location_id') location_id : number) {
      console.log("get all contact tracing by location_id..");
      const c_tracingList : c_tracing[] = await this.CtracingService.getCtracingByLocationID(location_id);
      const locationListDict: {} = await this.locationService.getAllLocationDict();

      const convertDateToStr = (date : Date) =>  (date === undefined) ? "" : date.toISOString();
      const result : ViewCtracingDto[] = c_tracingList
          .map((c_tracing : c_tracing) => {
          const location : Location = locationListDict[c_tracing.location_id];
          const dto = new ViewCtracingDto(
              c_tracing.p_nric,
              location.location_name,
              convertDateToStr(c_tracing.date));
          return dto;
      });
      return result;
  }

  @Post()
  async createCtracing(@Body() dto: CreateCtracingDto): Promise<c_tracing> {
      const locationId : number = dto.location_id;
      const p_nric : string = dto.p_nric;
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

  @Post('/report/monthly/')
  async generateMonthlyReport(@Body() dto: ReportMonthlyQueryCtracingDto): Promise<{}> {
      const dtoResult : string | ReportMonthlyComputeCtracingDto = DateUtil.validateMonthlyQuery(dto);
      if(typeof(dtoResult) === "string"){
          console.log(dtoResult);
          //date related errors shown here
          throw new HttpException(
              dtoResult,
              HttpStatus.BAD_REQUEST);
      }
      else {
          const result = await this.ctracing_reportService.generateMonthlyReport(dtoResult);
          return result;
      }
  }

  @Post('/report/weekly/')
  async generateWeeklyReport(@Body() dto: ReportWeeklyQueryCtracingDto): Promise<{}> {
      const dtoResult: string | ReportWeeklyQueryCtracingDto = DateUtil.valdiateWeeklyQuery(dto);
      if(typeof(dtoResult) === "string"){
          //date related errors shown here
          console.log(dtoResult);
          throw new HttpException(
              dtoResult,
              HttpStatus.BAD_REQUEST);
      }
      else {
          const result = await this.ctracing_reportService.generateWeeklyReport(dtoResult);
          console.log(result);
          return result;
      }
    }



}
