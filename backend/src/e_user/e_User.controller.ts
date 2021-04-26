import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CreateEnterpriseUserDto} from "./dto/create-eUser.dto";
import {UpdateEnterpriseUserDto} from "./dto/update-eUser.dto";

import { E_User } from './schemas/e_user.schema';
import {E_UserService} from "./e_User.service";

@Controller('e_user')
export class E_UserController {
    constructor(private readonly e_UserService: E_UserService) {}

    @Get(':eNRIC')
    async getUserByEnterpriseNRIC(@Param('eNRIC') eNRIC: string): Promise<E_User> {
        console.log("get eNRIC:" + eNRIC);
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
            createEnterpriseUserDto.eNRIC,
            createEnterpriseUserDto.firstName,
            createEnterpriseUserDto.lastName,
            createEnterpriseUserDto.password,
            createEnterpriseUserDto.adminType,
        );
    }

    @Patch(':eNRIC')
    async updateEnterpriseUser(@Param('eNRIC') eNRIC: string, @Body() updateUserDto: UpdateEnterpriseUserDto): Promise<E_User> {
        return this.e_UserService.updateUser(eNRIC, updateUserDto);
    }

    @Delete(':eNRIC')
    async deleteUserByEnterpriseNRIC(@Param('eNRIC') eNRIC: string): Promise<string> {
        console.log("deleted eNRIC:" + eNRIC);
        const eUser : E_User = await this.e_UserService.deleteUserById(eNRIC);
        if(eUser != null) {
            return  eUser.eNRIC;
        }
        throw new HttpException("unable to find username to delete",HttpStatus.BAD_REQUEST);
    }

}
