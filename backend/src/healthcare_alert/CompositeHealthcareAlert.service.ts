import {Injectable} from "@nestjs/common";

import {HealthcareAlertService} from "./healthcareAlert.service";
import {LocationService} from "../location/location.service";
import {HealthcareAlert} from "./schemas/healthcareAlert.schema";
import {ViewHealthcareAlertsDto} from "./dto/view-healthcareAlerts.dto";

@Injectable()
export class CompositeHealthcareAlertService {
    constructor(private readonly healthcareAlertService : HealthcareAlertService,
                private readonly locationService : LocationService,
    ) {}

    //hashmap filter
    filterLocation: (location_id: number, locationList : {}) => string = (location_id: number, locationList : {}) => {
        console.log(location_id);
        if (locationList[location_id] === null || locationList[location_id] === undefined) {
            console.log(locationList[location_id]);
            return "undefined";
        } else {
            const locationInterface = locationList[location_id.toString()];
            return locationInterface.location_name;
        }
    }

    async getAllHealthcareAlertsDTO(): Promise<ViewHealthcareAlertsDto[]> {
        const healthcareAlerts : HealthcareAlert[] = await this.healthcareAlertService.getAllHealthcareAlerts();
        const locationList: {} = await this.locationService.getAllLocationDict();

        const healthcareAlert : ViewHealthcareAlertsDto[] = healthcareAlerts.map((healthcareAlerts : HealthcareAlert) => {
            const healthcare_id = healthcareAlerts.location_id;
            const healthcare_name = this.filterLocation(healthcare_id,locationList);
            const dto = new ViewHealthcareAlertsDto();
            dto.date = healthcareAlerts.date.toLocaleString();
            dto.location_name = healthcare_name;
            dto.description = healthcareAlerts.description;
            dto.e_nric = healthcareAlerts.e_nric;
            return dto;
        });
        return healthcareAlert;
    }
}