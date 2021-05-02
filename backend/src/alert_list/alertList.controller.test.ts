
import { Controller } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { AlertListController } from './alertList.controller';
import { AlertListService } from './alertList.service';


describe('AlertListController', () =>{

    let controller: AlertListController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AlertListController],
            providers: [AlertListService],
        }).compile();

        controller = module.get<AlertListController>(AlertListController);
    });


    it('should be defined', ()=> {
        expect(controller).toBeDefined();
    })

})