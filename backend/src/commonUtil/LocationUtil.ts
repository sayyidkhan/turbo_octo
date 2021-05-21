import {PerMonth_CTracingListing, PerWeek_CTracingListing} from "./ReportUtil";

export abstract class LocationUtil {

    public static districtCounter(
        locationDict,
        monthList: PerWeek_CTracingListing | PerMonth_CTracingListing) {
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

}