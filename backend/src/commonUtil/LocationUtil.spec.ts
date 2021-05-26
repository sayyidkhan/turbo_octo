import {Location} from "../location/schemas/location.schema";
import {LocationUtil} from "./LocationUtil";


export class LocationUtilMock {
    public static getAllLocationDict() : {} {
        const location = new Location();
        location.location_id = 123456;
        location.location_name = "location_name_1";
        location.district = "west";

        const myDict = {};
        const locationDict = {
            "locationId": location.location_id,
            "location_name": location.location_name,
            "district": "west",
        };
        myDict[location.location_id] = locationDict;
        return myDict;
    }
}

describe("LocationUtil", () => {

    it("test - districtCounter() (positive)", () => {
        const locationDict = LocationUtilMock.getAllLocationDict();
        const monthList = {
            myList : [],
            total_amount : 0,
            north : 0,
            south : 0,
            east : 0,
            west : 0
        };

        LocationUtil.districtCounter(locationDict,monthList);
        expect(monthList.total_amount).toEqual(1);
    });

    it("test - districtCounter() (scenario - 2)", () => {
        const monthList = {
            myList : [],
            total_amount : 0,
            north : 0,
            south : 0,
            east : 0,
            west : 0
        };

        LocationUtil.districtCounter(undefined,monthList);
        //increase the counter
        LocationUtil.districtCounter(undefined,monthList);
        expect(monthList.total_amount).toEqual(2);
    });

});