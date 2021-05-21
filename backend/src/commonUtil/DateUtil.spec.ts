import {DateUtil} from "./DateUtil";
import {DateQuery} from "./ReportUtil";

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
    })


});