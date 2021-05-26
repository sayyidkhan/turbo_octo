import {Location } from "../location/schemas/location.schema";

export abstract class SweeperUtil {

    static assignLocationName(location : Location) {
        if(location !== undefined) {
            return location.location_name;
        }
        else {
            return "undefined";
        }
    }

}