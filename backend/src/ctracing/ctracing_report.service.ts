import {Injectable} from "@nestjs/common";
import {CtracingService} from "./ctracing.service";
import {ReportMonthlyComputeCtracingDto, ReportWeeklyQueryCtracingDto} from "./dto/report-ctracing.dto";
import {PerMonth_CTracingListing, PerWeek_CTracingListing, ReportUtil} from "../commonUtil/ReportUtil";
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

        function districtCounter(locationDict, monthList: PerWeek_CTracingListing) {
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

        function weekSelection(day : number): number {
            if(day >= 1 || day <= 7) {
                //week 1
                return 1;
            }
            else if(day >= 8 || day <= 14){
                //week 2
                return 2;
            }
            else if(day >= 15 || day <= 21){
                //week 3
                return 3;
            }
            else if(day >= 22 || day <= 31){
                return 4;
            }
            else{
                //error
                return null;
            }
        }

        c_tracings.forEach((c_tracing : c_tracing) => {
            //update month if month is not updated
            currWeek =  weekSelection(c_tracing.date.getDay());
            //insert into calendar dictionary
            const monthList : PerWeek_CTracingListing = calendar_dict[currWeek];
            //push existing records
            monthList.myList.push(c_tracing);
            //add all the counters for the month
            const locationDict = all_districts[c_tracing.location_id];
            districtCounter(locationDict, monthList);
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