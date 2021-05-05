import {LocationController} from "./location.controller";
import {LocationService} from "./location.service";
import {Location} from "./schemas/location.schema";


describe('LocationController', ()=> {
    let locationController : LocationController;
    let spyService : LocationService;

    beforeEach(async () => {
        //api service provider
       const APIServiceProvider = {
            provider: LocationService,
           useFactory: () => ({
               getAllLocation: jest.fn(() => [new Location()]),
           })
       };
    });


});

//https://nishabe.medium.com/unit-testing-a-nestjs-app-in-shortest-steps-bbe83da6408