import {Injectable} from "@nestjs/common";

import {AlertList} from "./schemas/alertList.schema";
import {AlertListService} from "./alertList.service";
import {LocationService} from "../location/location.service";
import {P_userAlertListDto} from "./dto/p_user-alert-list.dto";
import {ViewAlertListDto} from "./dto/alert-list.dto";
import {c_tracing} from "../ctracing/schemas/ctracing.schema";
import {Location} from "../location/schemas/location.schema";
import {ViewCtracingDto} from "../ctracing/dto/view-ctracing.dto";

@Injectable()
export class CompositeAlertListService {
    constructor(
        private readonly alertListService: AlertListService,
        private readonly locationService : LocationService,
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

    async getOnlyActiveAlerts(): Promise<P_userAlertListDto[]> {
        const alertList : AlertList[] = await this.alertListService.getAlertsWithQuery({active : true});
        const locationList: {} = await this.locationService.getAllLocationDict();

        //convert alertList to activeOnly list
        const userAlertList = alertList.map((alertList : AlertList) => {
            const id = alertList.alertListId;
            const alertTitle = alertList.alertTitle;
            const alertDetail = alertList.alertDetail;
            const alertDate = alertList.alertDate.toISOString();
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

    async getAlertListByLocationId(location_id : number) {
        const alertList : AlertList[] = await this.alertListService.getAlertsWithQuery({location_id : location_id});
        const locationList: {} = await this.locationService.getAllLocationDict();

        const alertListDTO : ViewAlertListDto[] = alertList.map((alertList : AlertList) => {
            const location_name = this.filterLocation(alertList.location_id,locationList);
            const dto = new ViewAlertListDto(alertList,location_name);
            return dto;
        });

        return alertListDTO;
    }

    async getAlertListByDistrict(district : string) {
        const alertLists : AlertList[] = await this.alertListService.getAllAlerts();
        const locationListDict: {} = await this.locationService.getLocationByDistrict(district);
        const result = alertLists
            .filter((alertList : AlertList) => {
                const location : Location = locationListDict[alertList.location_id];
                return location !== undefined;
            })
            .map((alertList : AlertList) => {
                const location : Location = locationListDict[alertList.location_id];
                const dto = new ViewAlertListDto(alertList,location.location_name);
                return dto;
            });

        return result;
    }

}