import {ReportMonthlyComputeCtracingDto, ReportWeeklyQueryCtracingDto} from "../ctracing/dto/report-ctracing.dto";
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

    public static validateMonthlyQuery = (dto : DateQuery) => {
        const dateFrom = DateUtil.convertStrToDate(dto.date_from);
        const dateTo = DateUtil.convertStrToDate(dto.date_to);

        const days_diff = 365;

        if(dateFrom === null){
            return "Invalid date from";
        }
        else if(dateTo === null){
            return "Invalid date to";
        }
        else {
            const rptDto = new ReportMonthlyComputeCtracingDto(dto.date_from,dto.date_to);
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
        }
    }

    public static valdiateWeeklyQuery = (dto : ReportWeeklyQueryCtracingDto) => {
        const year = dto.year;
        const month = dto.month;
        if(year === undefined || month === undefined || year === null || month === null) {
            return "no year / date set";
        }
        else if(year === 0 || month === 0) {
            return "year or month is 0";
        }
        else {
            return dto;
        }

    };

    public static dateDiffInDays(dto : DateCompute) {
        const a : Date = dto.date_from;
        const b : Date = dto.date_to;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / DateUtil.MS_PER_DAY);
    }

    public static checkInvalidDateRange(dto : DateCompute) {
        const dateFrom : number = dto.date_from.getTime();
        const dateTo : number = dto.date_to.getTime();

        if(dateFrom > dateTo) {
            return "date from greater than date to";
        }
        else if(dateFrom === dateTo) {
            return "date from and date to cannot be same day";
        }
        else {
            return dto;
        }
    }

    public static weekSelection(date : Date): number {
        const day: number = date.getDate();
        if(day >= 1 && day <= 7) {
            //week 1
            return 1;
        }
        else if(day >= 8 && day <= 14){
            //week 2
            return 2;
        }
        else if(day >= 15 && day <= 21){
            //week 3
            return 3;
        }
        else if(day >= 22 && day <= 31){
            return 4;
        }
        else{
            //error
            return null;
        }
    }


}
