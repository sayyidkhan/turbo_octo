import {DateUtil} from "../../commonUtil/DateUtil";

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
