import {DateUtil} from "../../commonUtil/DateUtil";
import {AlertList} from "../schemas/alertList.schema";

export class AlertListDto {
    alertTitle: string;
    alertDetail: string;
    alertDate: string;
    active: boolean;
    location_id: number;
}

export class PersistAlertListDto {
    constructor(alertListDto : AlertListDto) {
        this.alertTitle = alertListDto.alertTitle;
        this.alertDetail = alertListDto.alertDetail;
        this.alertDate = DateUtil.convertStrToDate(alertListDto.alertDate);
        this.active = alertListDto.active;
        this.location_id = alertListDto.location_id;
    }
    alertTitle: string;
    alertDetail: string;
    alertDate: Date;
    active: boolean;
    location_id: number;
}

export class ViewAlertListDto {
    constructor(alertList : AlertList, location_name : string) {
        this.alertListId = alertList.alertListId;
        this.alertTitle = alertList.alertTitle;
        this.alertDetail = alertList.alertDetail;
        this.alertDate = alertList.alertDate.toLocaleString();
        this.active = alertList.active;
        this.location_name = location_name;
    }
    alertListId : number;
    alertTitle: string;
    alertDetail: string;
    alertDate: string;
    active: boolean;
    location_name: string;
}
