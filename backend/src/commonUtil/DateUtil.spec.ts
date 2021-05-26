import {DateUtil} from "./DateUtil";
import {DateCompute, DateQuery} from "./ReportUtil";
import {ReportWeeklyQueryCtracingDto} from "../ctracing/dto/report-ctracing.dto";

describe("DateUtil", () => {

    it("test convertStrToDate() positive", () => {
        const date = new Date().toISOString();
        const result = DateUtil.convertStrToDate(date);
        expect(result.toISOString()).toEqual(date);
    });

    it("test convertStrToDate() negative", () => {
        const result = DateUtil.convertStrToDate("2016--01---01");
        expect(result).toEqual(null);
    });

    it("test convertStrToDateQuery()", () => {
        const result = DateUtil.convertStrToDate("1/1/2021");
        expect(result.getMonth()).toEqual(0);
    });

    it("test validateMonthlyQuery() (negative scenario - 1)", () => {
        const dto : DateQuery = {
            date_from : "",
            date_to : "",
        };

        const result = DateUtil.validateMonthlyQuery(dto);
        expect(result).toContain("Invalid date from");
    })

    it("test validateMonthlyQuery() (negative scenario - 2)", () => {
        const dto : DateQuery = {
            date_from : new Date().toLocaleString(),
            date_to : "",
        };

        const result = DateUtil.validateMonthlyQuery(dto);
        expect(result).toContain("Invalid date to");
    })

    it("test validateMonthlyQuery() (negative scenario - 3)", () => {
        const dto : DateQuery = {
            date_from : new Date("1/1/2021").toLocaleString(),
            date_to : new Date("1/1/2021").toLocaleString(),
        };

        const result = DateUtil.validateMonthlyQuery(dto);
        expect(result).toContain("date from and date to cannot be same day");
    })

    it("test validateMonthlyQuery() (negative scenario - 4)", () => {
        const dto : DateQuery = {
            date_from : new Date(2021,10,10).toISOString(),
            date_to : new Date(2023,10,10).toISOString(),
        };

        const result = DateUtil.validateMonthlyQuery(dto);
        expect(result).toContain("exceeded 1 year search range.");
    });

    it("test validateMonthlyQuery() (positive)", () => {
        const dto : DateQuery = {
            date_from : new Date(2021,10,10).toISOString(),
            date_to : new Date(2021,11,10).toISOString(),
        };

        const result = DateUtil.validateMonthlyQuery(dto);
        expect(result !== null).toBeTruthy();
    });

    it("test valdiateWeeklyQuery() (negative - 1)", () => {
        const dto : ReportWeeklyQueryCtracingDto = {
            month : undefined,
            year : undefined,
        };

        const result = DateUtil.valdiateWeeklyQuery(dto);
        expect(result).toEqual("no year / date set");
    });

    it("test valdiateWeeklyQuery() (negative - 2)", () => {
        const dto : ReportWeeklyQueryCtracingDto = {
            month : null,
            year : null,
        };

        const result = DateUtil.valdiateWeeklyQuery(dto);
        expect(result).toEqual("no year / date set");
    });

    it("test valdiateWeeklyQuery() (negative - 3)", () => {
        const dto : ReportWeeklyQueryCtracingDto = {
            month : 0,
            year : 0,
        };

        const result = DateUtil.valdiateWeeklyQuery(dto);
        expect(result).toEqual("year or month is 0");
    });

    it("test valdiateWeeklyQuery() (positive)", () => {
        const dto : ReportWeeklyQueryCtracingDto = {
            month : 1,
            year : 2021,
        };

        const result = DateUtil.valdiateWeeklyQuery(dto);
        expect(result).toEqual(dto);
    });

    it("test dateDiffInDays()", () => {
        const dto : DateCompute = {
            date_from : new Date(2021,10,10),
            date_to : new Date(2021,10,20),
        };

        const result = DateUtil.dateDiffInDays(dto);
        expect(result).toEqual(10);
    });

    it("test checkInvalidDateRange() (positive)", () => {
        const dto : DateCompute = {
            date_from : new Date(2021,10,10),
            date_to : new Date(2021,10,20),
        };

        const result = DateUtil.checkInvalidDateRange(dto);
        expect(result !== null).toBeTruthy();
    });

    it("test checkInvalidDateRange() (negative - 1)", () => {
        const dto : DateCompute = {
            date_from : new Date(2021,10,20),
            date_to : new Date(2021,10,10),
        };

        const result = DateUtil.checkInvalidDateRange(dto);
        expect(result).toEqual("date from greater than date to");
    });

    it("test checkInvalidDateRange() (negative - 2)", () => {
        const dto : DateCompute = {
            date_from : new Date(2021,10,9),
            date_to : new Date(2021,10,9),
        };

        const result = DateUtil.checkInvalidDateRange(dto);
        expect(result).toEqual("date from and date to cannot be same day");
    });

    it("test weekSelection()", () => {
        const array = [
            new Date("2021-01-01"),
            new Date("2021-01-08"),
            new Date("2021-01-15"),
            new Date("2021-01-23")
        ];


        const result_1 = DateUtil.weekSelection(array[0]);
        expect(result_1).toBe(1);
        const result_2 = DateUtil.weekSelection(array[1]);
        expect(result_2).toBe(2);
        const result_3 = DateUtil.weekSelection(array[2]);
        expect(result_3).toBe(3);
        const result_4 = DateUtil.weekSelection(array[3]);
        expect(result_4).toBe(4);
        const result_5 = DateUtil.weekSelection(new Date(""));
        expect(result_5).toBe(null);
    });

});