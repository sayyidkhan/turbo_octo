import {Injectable} from "@nestjs/common";
import {CtracingService} from "./ctracing.service";
import {ReportComputeCtracingDto} from "./dto/report-ctracing.dto";
import {PerMonth_CTracingListing, ReportUtil} from "../commonUtil/ReportUtil";
import {c_tracing} from "./schemas/ctracing.schema";
import {LocationService} from "../location/location.service";

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

        function districtCounter(locationDict, monthList: PerMonth_CTracingListing) {
            console.log(locationDict);
            //count district
            if (locationDict !== undefined) {
                const district = locationDict.district;
                monthList[district] += 1;
            }
            else {
                const district = "undefined_district";
                if (monthList[district] == undefined) {
                    monthList[district] = 1;
                } else {
                    monthList[district] += 1;
                }
            }
            //count total
            monthList.total_amount += 1;
        }

        c_tracings.forEach((c_tracing : c_tracing) => {
            //update month if month is not updated
            currMonth = c_tracing.date.getMonth() + 1;
            //insert into calendar dictionary
            const monthList : PerMonth_CTracingListing = calendar_dict[currMonth];
            //push existing records
            monthList.myList.push(c_tracing);
            //add all the counters for the month
            const locationDict = all_districts[c_tracing.location_id];
            districtCounter(locationDict, monthList);
        });
        return calendar_dict;
    }

    async generateMonthlyReport(dto : ReportComputeCtracingDto) {
        const c_tracings : c_tracing[] = await this.ctracingService.getCtracingByDates(dto.date_from,dto.date_to);
        if(c_tracings.length !== 0) {
            const all_districts = await this.locationService.getAllLocationDict();
            //create dict
            const calendarDict = ReportUtil.createCalendarDict_ForMonthly(dto);
            //sort records by month
            const sortedDict = this.sortRecordsByMonth(c_tracings, calendarDict, all_districts);
            return sortedDict;
        }
        else {
            return {};
        }
    }

    async generateWeeklyReport(dto : ReportComputeCtracingDto) {
        const c_tracings : c_tracing[] = await this.ctracingService.getCtracingByMonthOnly(dto.date_from);
        if(c_tracings.length !== 0){
            const all_districts = await this.locationService.getAllLocationDict();
            //create dict
            const calendarDict = ReportUtil.createCalendarDict_ForWeekly();

            return calendarDict;
        }
        else {
            return {};
        }
    }

}