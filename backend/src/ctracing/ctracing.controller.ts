import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCtracingDto } from './dto/create-ctracing.dto';
import { c_tracing} from './schemas/ctracing.schema';
import { CtracingService } from './ctracing.service';




@Controller('c_tracing')
export class CtracingController {
  constructor(private readonly CtracingService: CtracingService) {}


  // single row without 's'
  @Get(':ct_id')
  async getCtracing(@Param('ct_id') ct_id: number): Promise<c_tracing> {
    return this.CtracingService.getCtracingById(ct_id);
  }

  @Get("searchbynric/:nric")
  async getCtracingByNric(@Param('nric') nric : string) : Promise<c_tracing[]> {
      return this.CtracingService.getCtracingByNric(nric);
  }

  //Multiple row with 's'
  @Get()
  async getCtracings(): Promise<c_tracing[]> {
      console.log("get all contact tracing..");
      return this.CtracingService.getCtracing();
  }

  //Take note two DTO varia with different cap
  @Post()
  async createCtracing(@Body() createCtracingDto: CreateCtracingDto): Promise<c_tracing> {
      console.log("contact tracing DTO received successfully...")
      return this.CtracingService.createCtracing(
          createCtracingDto.p_nric,
          createCtracingDto.location_id,
          createCtracingDto.date);
  }

}
