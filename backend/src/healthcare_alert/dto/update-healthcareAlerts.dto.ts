import {DateUtil} from "../../commonUtil/DateUtil";

export class UpdateHealthcareAlertsDto {
    date: string;
    location_id: number;
    description: string;
    e_nric : string;
}

export class PersistUpdateHealthcareAlertsDto {


    constructor(dto: UpdateHealthcareAlertsDto) {
        this.date =  DateUtil.convertStrToDate(dto.date);
        this.location_id = dto.location_id;
        this.description = dto.description;
        this.e_nric = dto.e_nric;
    }

    date: Date;
    location_id: number;
    description: string;
    e_nric : string;
}