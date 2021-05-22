import {Injectable} from "@nestjs/common";

import {AlertList} from "./schemas/alertList.schema";
import {AlertListService} from "./alertList.service";
import {LocationService} from "../location/location.service";
import {P_userAlertListDto} from "./dto/p_user-alert-list.dto";
import {ViewAlertListDto} from "./dto/alert-list.dto";

@Injectable()
export class CompositeAlertListService {
    constructor(
        private readonly alertListService: AlertListService,
        private readonly locationService : LocationService,
    ) {}

    //hashmap filter
    filterLocation: (location_id: number, locationList : {}) => string = (location_id: number, locationList : {}) => {
        console.log(location_id);
        if (locationList[location_id] === null || locationList[location_id] === undefined) {
            return "undefined";
        } else {
            const locationInterface = locationList[location_id.toString()];
            return locationInterface.location_name;
        }
    }

    async getOnlyActiveAlerts(): Promise<P_userAlertListDto[]> {
        const alertList : AlertList[] = await this.alertListService.getAlertsWithQuery({active : true});
        const locationList: {} = await this.locationService.getAllLocationDict();

        //convert alertList to activeOnly list
        const userAlertList = alertList.map((alertList : AlertList) => {
            const id = alertList.alertListId;
            const alertTitle = alertList.alertTitle;
            const alertDetail = alertList.alertDetail;
            const alertDate = alertList.alertDate.toLocaleString();
            const location_name : string = this.filterLocation(alertList.location_id,locationList);

            return new P_userAlertListDto(id, alertTitle, alertDetail, alertDate, location_name);
        });
        return userAlertList;
    }

    async getAllAlertListDTO(): Promise<ViewAlertListDto[]> {
        const alertList : AlertList[] = await this.alertListService.getAllAlerts();
        const locationList: {} = await this.locationService.getAllLocationDict();

        const alertListDTO : ViewAlertListDto[] = alertList.map((alertList : AlertList) => {
           const location_name = this.filterLocation(alertList.location_id,locationList);
           const dto = new ViewAlertListDto(alertList,location_name);
           return dto;
        });

        return alertListDTO;
    }

}