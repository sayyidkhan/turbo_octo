import {Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { v_cert} from './schemas/vaccine.schema';
import { VaccineService } from './vaccine.service';
import {P_UserService} from "../p_user/p_user.service";
import {E_UserService} from "../e_user/e_User.service";
import {p_user} from "../p_user/schemas/p_user.schema";
import {E_User} from "../e_user/schemas/e_user.schema";
import {DateUtil} from "../commonUtil/DateUtil";
import {LatestVaccineDto} from "./dto/latest-vaccine.dto";
import {
    ReportMonthlyComputeCtracingDto,
    ReportMonthlyQueryCtracingDto,
    ReportWeeklyQueryCtracingDto
} from "../ctracing/dto/report-ctracing.dto";
import {Vaccine_reportService} from "./vaccine_report.service";


@Controller('vaccines')
export class VaccineController {
  constructor(
      private readonly VaccineService: VaccineService,
      private readonly p_UserService :  P_UserService,
      private readonly e_UserService : E_UserService,
      private readonly vaccine_reportService : Vaccine_reportService,
  ) {}


  @Get(':v_cert_id')
  async getVaccineById(@Param('v_cert_id') v_cert_id: number): Promise<v_cert> {
    console.log(v_cert_id);
    console.log("get by ID...");
    return this.VaccineService.getVaccineById(v_cert_id);
  }

  @Get('/latest_vaccine_record/:p_nric')
  async getVaccineRecordByp_nric(@Param('p_nric') p_nric: string): Promise<LatestVaccineDto> {
      const vaccineRecord : v_cert = await this.VaccineService.getLatestVaccinationRecordOnly(p_nric);
      const pUser : p_user = await this.p_UserService.getP_UserById(vaccineRecord.p_nric);
      const eUser : E_User = await this.e_UserService.getEnterpriseUserById(vaccineRecord.e_nric);
      const dto : LatestVaccineDto = new LatestVaccineDto(vaccineRecord,pUser,eUser);
      return dto;
  }

  @Get('/p_user/:p_nric')
  async getVaccineByp_nric(@Param('p_nric') p_nric: string) : Promise<v_cert[]> {
      return this.VaccineService.getVaccineByp_nric(p_nric);
  }

  @Get('/e_user/:e_nric')
  async getVaccineBye_nric(@Param('e_nric') e_nric: string) : Promise<v_cert[]> {
      return this.VaccineService.getVaccineBye_nric(e_nric);
  }

  @Get()
  async getAllVaccinationList(): Promise<v_cert[]> {
      console.log("get all vaccine...");
      return this.VaccineService.getAllVaccinationList();
  }

  @Post()
  async createVaccine(@Body() createVaccineDto: CreateVaccineDto): Promise<v_cert> {
      const publicNric: string = createVaccineDto.p_nric;
      const enterpriseNric: string = createVaccineDto.e_nric;
      const date : Date = DateUtil.convertStrToDate(createVaccineDto.v_date);
      //check if public / enterprise is valid first
      const p_user: p_user = await this.p_UserService.getP_UserById(publicNric);
      const e_user: E_User = await this.e_UserService.getEnterpriseUserById(enterpriseNric);
      if (p_user === null) {
          const errorMsg = "public nric invalid. user is trying to enter public nric which doesnt exist in record.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else if(e_user === null) {
          const errorMsg = "enterpise nric invalid. user is trying to enter enterprise nric which doesnt exist in record.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else if(date === null) {
          const errorMsg = "date is invalid. please review the date string before sending.";
          console.log(errorMsg);
          throw new HttpException(
              errorMsg,
              HttpStatus.BAD_REQUEST);
      }
      else {
          console.log("vaccine DTO received successfully...");
          return this.VaccineService.createVaccine(
              publicNric,
              date,
              enterpriseNric
          );
      }
  }

    @Post('/report/monthly/')
    async generateMonthlyReport(@Body() dto: ReportMonthlyQueryCtracingDto): Promise<{}> {
        const dtoResult : string | ReportMonthlyComputeCtracingDto = DateUtil.validateMonthlyQuery(dto);
        if(typeof(dtoResult) === "string"){
            //date related errors shown here
            throw new HttpException(
                dtoResult,
                HttpStatus.BAD_REQUEST);
        }
        else {
            const result = await this.vaccine_reportService.generateMonthlyReport(dtoResult);
            console.log(dtoResult);
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
            const result = await this.vaccine_reportService.generateWeeklyReport(dtoResult);
            console.log(result);
            return result;
        }
    }

}
