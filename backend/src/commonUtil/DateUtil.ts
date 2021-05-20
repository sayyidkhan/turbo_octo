import {ReportComputeCtracingDto} from "../ctracing/dto/report-ctracing.dto";
import {DateCompute, DateQuery} from "./ReportUtil";

export abstract class DateUtil {

    static error: string = 'Invalid Date';
    static  MS_PER_DAY = 1000 * 60 * 60 * 24;

    public static convertStrToDate = (dateString : string) : Date => {
        const result = new Date(dateString);
        const validate = result.toString();
        if(validate !== DateUtil.error) {
            return result;
        }
        else {
            console.log("invalid date format");
            return null;
        }
    }

    public static convertStrToDateQuery = (dateString : string) : Date => {
        const dateObj : Date = DateUtil.convertStrToDate(dateString);
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const myDate = new Date();
        myDate.setTime(0);
        myDate.setUTCFullYear(year,month - 1,day);
        return myDate;
    }

    public static validateDates = (dto : DateQuery,report_type : string) => {
        const dateFrom = DateUtil.convertStrToDate(dto.date_from);
        const dateTo = DateUtil.convertStrToDate(dto.date_to);

        const days_diff = (report_type === "monthly") ? 365 : 31;

        if(dateFrom === null){
            return "Invalid date from";
        }
        else if(dateTo === null){
            return "Invalid date to";
        }
        else {
            const rptDto = new ReportComputeCtracingDto(dto.date_from,dto.date_to);
            const checkInvalidDateRange = DateUtil.checkInvalidDateRange(rptDto);
            const diffDays = DateUtil.dateDiffInDays(rptDto);

            if(typeof(checkInvalidDateRange) === "string") {
                return checkInvalidDateRange;
            }
            else if(diffDays > days_diff) {
                return "exceeded 1 year search range.";
            }
            else {
                return rptDto;
            }
            return ;
        }
    }

    public static dateDiffInDays(dto : DateCompute) {
        const a : Date = dto.date_from;
        const b : Date = dto.date_to;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / DateUtil.MS_PER_DAY);
    }

    public static checkInvalidDateRange(dto : DateCompute) {
        const dateFrom : number = dto.date_from.getUTCDate();
        const dateTo : number = dto.date_to.getUTCDate();

        if(dateFrom > dateTo) {
            return "date from greater than date to";
        }
        else if(dateTo < dateFrom) {
            return "date to lesser than date from";
        }
        else if(dateFrom === dateTo) {
            return "date from and date to cannot be same day";
        }
        else {
            return dto;
        }
    }

}
