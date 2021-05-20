import {Injectable} from "@nestjs/common";
import {PerMonth_CTracingListing, ReportUtil} from "../commonUtil/ReportUtil";
import {VaccineService} from "./vaccine.service";
import {v_cert} from "./schemas/vaccine.schema";
import {ReportComputeCtracingDto} from "../ctracing/dto/report-ctracing.dto";

@Injectable()
export class Vaccine_reportService {
    constructor(
        private readonly vaccineService: VaccineService,
    ) {}

    sortRecordsByMonth(
        c_tracings : v_cert[],
        calendar_dict : {}) {
        let currMonth = 0;

        c_tracings.forEach((vCert : v_cert) => {
            //update month if month is not updated
            currMonth = vCert.v_date.getMonth() + 1;
            //insert into calendar dictionary
            const monthList : PerMonth_CTracingListing = calendar_dict[currMonth];
            //push existing records
            monthList.myList.push(vCert);
            monthList.total_amount += 1;
        });
        return calendar_dict;
    }

    async generateMonthlyReport(dto : ReportComputeCtracingDto) {
        const c_tracings : v_cert[] = await this.vaccineService.getVaccineByDates(dto.date_from,dto.date_to);
        if(c_tracings.length !== 0) {
            //create dict
            const calendarDict = ReportUtil.createDictVaccinesForMonthly(dto);
            //sort records by month
            const sortedDict = this.sortRecordsByMonth(c_tracings, calendarDict);
            return sortedDict;
        }
        else {
            return {};
        }
    }

}