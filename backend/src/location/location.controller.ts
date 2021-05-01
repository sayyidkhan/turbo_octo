import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateAlertListDto } from './dto/update-user.dto';

import { Location } from './schemas/location.schema';
import {LocationService} from "./location.service";
import {CreateLocationDto} from "./dto/create-location.dto";

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(':locationId')
  async getUser(@Param('locationId') locationId: number): Promise<Location> {
      console.log("get location id:" + locationId);
      return this.locationService.getLocationById(locationId);
  }

  @Get()
  async getAllLocation(): Promise<Location[]> {
      console.log("get all location...");
      return this.locationService.getAllLocation();
  }

  @Post()
  async createNewLocation(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
      console.log("user DTO received successfully...");
      return this.locationService.createNewLocation(
          createLocationDto.locationId,
          createLocationDto.locationName,
          createLocationDto.district);
  }

  // @Patch(':userId')
  // async updateEnterpriseUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateAlertListDto): Promise<User> {
  //     return this.locationService.updateEnterpriseUser(userId, updateUserDto);
  // }

}
