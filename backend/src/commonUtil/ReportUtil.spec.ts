import {ReportUtil} from "./ReportUtil";


describe("ReportUtil", () => {

    it("test - createDictCtracingForMonthly() (test - 1 month)", () => {
        const dto = {
            date_from : new Date("2021-10-10"),
            date_to : new Date("2021-10-20"),
        };
        const result = ReportUtil.createDictCtracingForMonthly(dto);
        expect(result !== null).toBeTruthy();
    });

    it("test - createDictCtracingForMonthly() (test - more than 1 month)", () => {
        const dto = {
            date_from : new Date("2021-10-10"),
            date_to : new Date("2021-11-10"),
        };
        const result = ReportUtil.createDictCtracingForMonthly(dto);
        expect(result !== null).toBeTruthy();
    });

    it("test - createDictVaccinesForMonthly() (test - 1 month)", () => {
        const dto = {
            date_from : new Date("2021-10-10"),
            date_to : new Date("2021-10-20"),
        };
        const result = ReportUtil.createDictVaccinesForMonthly(dto);
        expect(result !== null).toBeTruthy();
    });

    it("test - createDictVaccinesForMonthly() (test - more than 1 month)", () => {
        const dto = {
            date_from : new Date("2021-10-10"),
            date_to : new Date("2021-11-10"),
        };
        const result = ReportUtil.createDictVaccinesForMonthly(dto);
        expect(result !== null).toBeTruthy();
    });

    it("test - createDictCtracingForWeekly()", () => {
        const result = ReportUtil.createDictCtracingForWeekly();
        expect(result !== null).toBeTruthy();
    });

    it("test - createDictVaccineForWeekly()", () => {
        const result = ReportUtil.createDictVaccineForWeekly();
        expect(result !== null).toBeTruthy();
    });

});
