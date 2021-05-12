import {Injectable} from "@nestjs/common";

import {AlertList} from "./schemas/alertList.schema";
import {AlertListService} from "./alertList.service";
import {LocationService} from "../location/location.service";
import {DateUtil} from "../commonUtil/DateUtil";
import {P_userAlertListDto} from "./dto/p_user-alert-list.dto";

@Injectable()
export class CompositeAlertListService {
    constructor(
        private readonly alertListService: AlertListService,
        private readonly locationService : LocationService,
    ) {}

    async getOnlyActiveAlerts(): Promise<P_userAlertListDto[]> {
        const alertList : AlertList[] = await this.alertListService.getAlertsWithQuery({active : true});
        const locationList: {} = await this.locationService.getAllLocationDict();

        //hashmap filter
        const filterLocation = (location_id : number) : string => {
            if(locationList[location_id] === null || locationList[location_id] === undefined) {
                return "undefined";
            }
            else {
                const locationInterface = locationList[location_id];
                return locationInterface.location_name;
            }
        }

        //convert alertList to activeOnly list
        const userAlertList : P_userAlertListDto[] = alertList.map((alertList : AlertList) => {
            const id = alertList.alertListId;
            const alertTitle = alertList.alertTitle;
            const alertDetail = alertList.alertDetail;
            const alertDate = alertList.alertDate.toLocaleString();
            const location_name = filterLocation(alertList.location_id);

            return new P_userAlertListDto(id, alertTitle, alertDetail, alertDate, location_name);
        });
        return userAlertList;
    }

}