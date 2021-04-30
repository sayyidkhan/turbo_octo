import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CreateEnterpriseUserDto} from "./dto/create-eUser.dto";
import {UpdateEnterpriseUserDto} from "./dto/update-eUser.dto";

import { E_User } from './schemas/e_user.schema';
import {E_UserService} from "./e_User.service";

@Controller('e_user')
export class E_UserController {
    constructor(private readonly e_UserService: E_UserService) {}

    @Get(':e_nric')
    async getUserByEnterpriseNRIC(@Param('e_nric') eNRIC: string): Promise<E_User> {
        console.log("get e_nric:" + eNRIC);
        return this.e_UserService.getEnterpriseUserById(eNRIC);
    }

    @Get()
    async getAllEnterpriseUsers(): Promise<E_User[]> {
        console.log("get all e_users...");
        return this.e_UserService.getAllEnterpriseUser();
    }

    @Post()
    async createNewEnterpriseUser(@Body() createEnterpriseUserDto: CreateEnterpriseUserDto): Promise<E_User> {
        console.log("e_user DTO received successfully...");
        return this.e_UserService.createNewEnterpriseUser(
            createEnterpriseUserDto.e_nric,
            createEnterpriseUserDto.firstname,
            createEnterpriseUserDto.lastname,
            createEnterpriseUserDto.password,
            createEnterpriseUserDto.admintype,
        );
    }

    @Patch(':e_nric')
    async updateEnterpriseUser(@Param('e_nric') eNRIC: string, @Body() updateUserDto: UpdateEnterpriseUserDto): Promise<E_User> {
        return this.e_UserService.updateEnterpriseUser(eNRIC, updateUserDto);
    }

    @Delete(':e_nric')
    async deleteEnterpriseUserByNRIC(@Param('e_nric') eNRIC: string): Promise<string> {
        console.log("deleted e_nric:" + eNRIC);
        const eUser : E_User = await this.e_UserService.deleteEnterpriseUserById(eNRIC);
        if(eUser != null) {
            return  eUser.e_nric;
        }
        throw new HttpException("unable to find username to delete",HttpStatus.BAD_REQUEST);
    }

}
