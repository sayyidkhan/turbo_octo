import {Injectable} from "@nestjs/common";
import {CtracingService} from "./ctracing.service";
import {ReportComputeCtracingDto} from "./dto/report-ctracing.dto";
import {PerMonth_DistrictListing, ReportUtil} from "../commonUtil/ReportUtil";
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

        c_tracings.forEach((c_tracing : c_tracing) => {
            //update month if month is not updated
            currMonth = c_tracing.date.getMonth() + 1;
            //insert into calendar dictionary
            const monthList : PerMonth_DistrictListing = calendar_dict[currMonth];
            //push existing records
            monthList.myList.push(c_tracing);
            //add all the counters for the month
            const district = all_districts[c_tracing.location_id].district;
            monthList[district] += 1;
            monthList.total_amount += 1;
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

}