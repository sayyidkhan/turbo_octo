import {SweeperUtil} from "./SweeperUtil";
import {Location} from "../location/schemas/location.schema";

describe("SweeperUtil", () => {

    it("test - assignLocationName() (negative)", () => {
        const result = SweeperUtil.assignLocationName(undefined);
        expect(result).toEqual("undefined");
    });

    it("test - assignLocationName() (positive)", () => {
        const location: Location = new Location();
        location.location_name = "location_name";

        const result = SweeperUtil.assignLocationName(location);
        expect(result).toEqual(location.location_name);
    });

});