//for frontend use only
import {DateUtil} from "../../commonUtil/DateUtil";
import {DateCompute, DateQuery} from "../../commonUtil/ReportUtil";


export class ReportQueryCtracingDto implements DateQuery {
    date_from: string;
    date_to: string;
}

//for backend use only
export class ReportComputeCtracingDto implements DateCompute {
    date_from: Date;
    date_to: Date;

    constructor(date_from : string,date_to: string) {

        this.date_from = DateUtil.convertStrToDateQuery(date_from);
        this.date_to = DateUtil.convertStrToDateQuery(date_to);
    }
}