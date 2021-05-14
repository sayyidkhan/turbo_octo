import {DateUtil} from "./DateUtil";

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

});