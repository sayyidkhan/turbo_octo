import {Injectable} from "@nestjs/common";
import {HealthcareAlertService} from "./healthcareAlert.service";
import {LocationService} from "../location/location.service";
import {HealthcareAlert} from "./schemas/healthcareAlert.schema";
import {ViewHealthcareAlertsDto} from "./dto/view-healthcareAlerts.dto";
import {DateUtil} from "../commonUtil/DateUtil";
import {E_User} from "../e_user/schemas/e_user.schema";
import {CreateHealthcareAlertsDto} from "./dto/create-healthcareAlerts.dto";
import {E_UserService} from "../e_user/e_User.service";
import {Location} from '../location/schemas/location.schema';

@Injectable()
export class CompositeHealthcareAlertService {
    constructor(private readonly healthcareAlertService : HealthcareAlertService,
                private readonly locationService : LocationService,
                private readonly e_UserService : E_UserService,
    ) {}

    //hashmap filter
    filterLocation: (location_id: number, locationList : {}) => string = (location_id: number, locationList : {}) => {
        if (locationList[location_id] === null || locationList[location_id] === undefined) {
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
            dto.date = healthcareAlerts.date.toISOString();
            dto.location_name = healthcare_name;
            dto.description = healthcareAlerts.description;
            dto.e_nric = healthcareAlerts.e_nric;
            return dto;
        });
        return healthcareAlert;
    }

    async createNewHealthcareAlerts(dto: CreateHealthcareAlertsDto) {
        const date : Date = DateUtil.convertStrToDate(dto.date);
        const e_user: E_User = await this.e_UserService.getEnterpriseUserById(dto.e_nric);
        const location: Location = await this.locationService.getLocationById(dto.location_id);
        if(date === null) {
            const errorMsg = "date is invalid. please review the date string before sending.";
            return errorMsg;
        }
        else if(e_user === null){
            const errorMsg = "enterpise nric invalid. user is trying to enter enterprise nric which doesnt exist in record.";
            return errorMsg;
        }
        else if(location === null){
            const errorMsg = "location is invalid. please review the location id before sending.";
            return errorMsg;
        }
        else {
            return dto;
        }

    }

}