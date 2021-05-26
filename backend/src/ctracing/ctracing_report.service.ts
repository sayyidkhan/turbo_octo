import {Injectable} from "@nestjs/common";
import {CtracingService} from "./ctracing.service";
import {ReportMonthlyComputeCtracingDto, ReportWeeklyQueryCtracingDto} from "./dto/report-ctracing.dto";
import {PerMonth_CTracingListing, PerWeek_CTracingListing, ReportUtil} from "../commonUtil/ReportUtil";
import {c_tracing} from "./schemas/ctracing.schema";
import {LocationService} from "../location/location.service";
import {DateUtil} from "../commonUtil/DateUtil";
import {LocationUtil} from "../commonUtil/LocationUtil";

@Injectable()
export class Ctracing_reportService {
    constructor(
        private readonly ctracingService: CtracingService,
        private readonly locationService: LocationService,
        ) {}

    sortRecordsByMonth(
        c_tracings : c_tracing[],
        calendar_dict : {},
        all_districts : {}) {
        let currMonth = 0;

        c_tracings.forEach((c_tracing : c_tracing) => {
            //update month if month is not updated
            currMonth = c_tracing.date.getMonth() + 1;
            //insert into calendar dictionary
            const monthList : PerMonth_CTracingListing = calendar_dict[currMonth];
            //push existing records
            monthList.myList.push(c_tracing);
            //add all the counters for the month
            const locationDict = all_districts[c_tracing.location_id];
            LocationUtil.districtCounter(locationDict, monthList);
        });
        return calendar_dict;
    }

    async generateMonthlyReport(dto : ReportMonthlyComputeCtracingDto) {
        const c_tracings : c_tracing[] = await this.ctracingService.getCtracingByDates(dto.date_from,dto.date_to);
        if(c_tracings.length !== 0) {
            const all_districts = await this.locationService.getAllLocationDict();
            //create dict
            const calendarDict = ReportUtil.createDictCtracingForMonthly(dto);
            //sort records by month
            const sortedDict = this.sortRecordsByMonth(c_tracings, calendarDict, all_districts);
            return sortedDict;
        }
        else {
            return {};
        }
    }

    sortRecordsByWeek(
        c_tracings : c_tracing[],
        calendar_dict : {},
        all_districts : {}) {
        let currWeek = 0;

        c_tracings.forEach((c_tracing : c_tracing) => {
            //update month if month is not updated
            currWeek =  DateUtil.weekSelection(c_tracing.date);
            //insert into calendar dictionary
            const monthList : PerWeek_CTracingListing = calendar_dict[currWeek];
            //push existing records
            monthList.myList.push(c_tracing);
            //add all the counters for the month
            const locationDict = all_districts[c_tracing.location_id];
            LocationUtil.districtCounter(locationDict, monthList);
        });
        return calendar_dict;
    }

    async generateWeeklyReport(dto : ReportWeeklyQueryCtracingDto) {
        const c_tracings : c_tracing[] = await this.ctracingService.getCtracingByMonthOnly(dto.month,dto.year);
        if(c_tracings.length !== 0){
            const all_districts = await this.locationService.getAllLocationDict();
            //create dict
            const calendarDict = ReportUtil.createDictCtracingForWeekly();
            //sort records by week
            const sortedDict = this.sortRecordsByWeek(c_tracings, calendarDict, all_districts);

            return sortedDict;
        }
        else {
            return {};
        }
    }

}