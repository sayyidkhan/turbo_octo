import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {HealthcareAlertService} from "./healthcareAlert.service";
import {HealthcareAlert} from "./schemas/healthcareAlert.schema";
import {CreateHealthcareAlertsDto} from "./dto/create-healthcareAlerts.dto";
import {UpdateHealthcareAlertsDto} from "./dto/update-healthcareAlerts.dto";


@Controller('healthcare_alert')
export class HealthcareAlertController {
  constructor(private readonly healthcareAlertService: HealthcareAlertService) {}

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
  async createNewHealthcareAlerts(@Body() alertsDto: CreateHealthcareAlertsDto): Promise<HealthcareAlert> {
      console.log("healthcare DTO received successfully...")
      return this.healthcareAlertService.createNewHealthcareAlerts(
          alertsDto.healthcareAlertId,
          alertsDto.date,
          alertsDto.location_id,
          alertsDto.description
      );
  }

  @Patch(':healthcareAlertId')
  async updateHealthcareAlerts(@Param('healthcareAlertId') healthcareAlertId: string, @Body() updateDto: UpdateHealthcareAlertsDto): Promise<HealthcareAlert> {
      return this.healthcareAlertService.updateHealthcareAlertByID(healthcareAlertId, updateDto);
  }

}
