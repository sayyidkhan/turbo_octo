import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { v_cert} from './schemas/vaccine.schema';
import { VaccineService } from './vaccine.service';




@Controller('vaccines')
export class VaccineController {
  constructor(private readonly VaccineService: VaccineService) {}


  // single row without 's'
  @Get(':v_cert_id')
  async getVaccine(@Param('v_cert_id') v_cert_id: number): Promise<v_cert> {
    return this.VaccineService.getVaccineById(v_cert_id);
  }

  //Multiple row with 's'
  @Get()
  async getVaccines(): Promise<v_cert[]> {
      console.log("get all vaccine...");
      return this.VaccineService.getVaccine();
  }

  //Take note two DTO varia with different cap
  @Post()
  async createVaccine(@Body() createVaccineDto: CreateVaccineDto): Promise<v_cert> {
      console.log("vaccine DTO received successfully...")
      return this.VaccineService.createVaccine(createVaccineDto.v_cert_id, createVaccineDto.p_nric,
        createVaccineDto.v_date,createVaccineDto.e_nric)
  }





}
