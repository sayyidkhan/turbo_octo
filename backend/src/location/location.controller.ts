import {Controller, Get, Param} from '@nestjs/common';
import {Location} from './schemas/location.schema';
import {LocationService} from "./location.service";

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(':locationId')
  async getLocationById(@Param('locationId') locationId: number): Promise<Location> {
      console.log("get location id:" + locationId);
      return this.locationService.getLocationById(locationId);
  }

  @Get()
  async getAllLocation(): Promise<Location[]> {
      console.log("get all location...");
      return this.locationService.getAllLocation();
  }

}
