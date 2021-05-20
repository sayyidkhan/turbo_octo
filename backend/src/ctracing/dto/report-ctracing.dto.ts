//for frontend use only
import {DateUtil} from "../../commonUtil/DateUtil";
import {DateCompute, DateQuery, WeeklyQuery} from "../../commonUtil/ReportUtil";


export class ReportMonthlyQueryCtracingDto implements DateQuery {
    date_from: string;
    date_to: string;
}

//for backend use only
export class ReportMonthlyComputeCtracingDto implements DateCompute {
    date_from: Date;
    date_to: Date;

    constructor(date_from : string,date_to: string) {

        this.date_from = DateUtil.convertStrToDateQuery(date_from);
        this.date_to = DateUtil.convertStrToDateQuery(date_to);
    }
}

export class ReportWeeklyQueryCtracingDto implements WeeklyQuery {
    month: number;
    year: number;
}