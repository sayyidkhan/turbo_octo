import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CreateEnterpriseUserDto} from "./dto/create-eUser.dto";
import {UpdateEnterpriseUserDto} from "./dto/update-eUser.dto";

import { E_User } from './schemas/e_user.schema';
import {E_UserService} from "./e_User.service";
import {LoginEnterpriseUserDto} from "./dto/login-eUser.dto";

@Controller('e_user')
export class E_UserController {
    constructor(private readonly e_UserService: E_UserService) {}

    @Get(':e_nric')
    async getUserByEnterpriseNRIC(@Param('e_nric') eNRIC: string): Promise<E_User> {
        console.log("get e_nric:" + eNRIC);
        return this.e_UserService.getEnterpriseUserById(eNRIC);
    }

    @Post("/login")
    async validateLogin(@Body() userLoginDto : LoginEnterpriseUserDto) : Promise<E_User> {
        const eNRIC = userLoginDto.e_nric;
        const password = userLoginDto.password;
        const e_user :E_User = await this.e_UserService.getEnterpriseUserById(eNRIC);
        //if e_user returns null, user is trying to update record that does not exist in db
        if(e_user === null) {
            const errorMsg : string = "eNRIC does not exist.";
            console.log("login failed." + errorMsg);
            throw new HttpException(
                errorMsg,
                HttpStatus.BAD_REQUEST);
        }
        else if(e_user.password !== password) {
            const errorMsg : string = "incorrect password.";
            console.log("login failed." + errorMsg);
            throw new HttpException(
                errorMsg,
                HttpStatus.BAD_REQUEST);
        }
        else {
            console.log("login successful.");
            return e_user;
        }
    }

    @Get()
    async getAllEnterpriseUsers(): Promise<E_User[]> {
        console.log("get all e_users...");
        return this.e_UserService.getAllEnterpriseUser();
    }

    @Post()
    async createNewEnterpriseUser(@Body() dto: CreateEnterpriseUserDto): Promise<E_User> {
        const e_user :E_User = await this.e_UserService.getEnterpriseUserById(dto.e_nric);
        if(e_user !== null){
            const errorMsg : string = "unable to add existing user.";
            console.log("create new user failed." + errorMsg);
            throw new HttpException(
                errorMsg,
                HttpStatus.BAD_REQUEST);
        }
        else {
            console.log("e_user DTO received successfully...");
            return this.e_UserService.createNewEnterpriseUser(
                dto.e_nric,
                dto.firstname,
                dto.lastname,
                dto.password,
                dto.admintype,
            );
        }
    }

    @Patch(':e_nric')
    async updateEnterpriseUser(@Param('e_nric') eNRIC: string, @Body() updateUserDto: UpdateEnterpriseUserDto): Promise<E_User> {
        const e_user :E_User = await this.e_UserService.getEnterpriseUserById(eNRIC);
        //if e_user returns null, user is trying to update record that does not exist in db
        if(e_user === null) {
            const errorMsg : string = "eNRIC does not exist.";
            throw new HttpException(
                errorMsg,
                HttpStatus.BAD_REQUEST);
        }
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
