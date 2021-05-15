import {Injectable} from "@nestjs/common";
import {CtracingService} from "./ctracing.service";
import {ViewCtracingDto} from "./dto/view-ctracing.dto";
import {c_tracing} from "./schemas/ctracing.schema";
import {LocationService} from "../location/location.service";
import { Location } from "../location/schemas/location.schema";


@Injectable()
export class CompositeCtracingService {
    constructor(
        private readonly CtracingService: CtracingService,
        private readonly locationService: LocationService,
        ) {}

    async getCtracingByNric(p_nric: string): Promise<ViewCtracingDto[]> {
        const cTracingList : c_tracing[] = await this.CtracingService.getCtracingByNric(p_nric);
        const locationListDict: {} = await this.locationService.getAllLocationDict();
        const result : ViewCtracingDto[] = cTracingList.map((c_tracing : c_tracing) => {
            const date : string = c_tracing.date.toLocaleString();
            const location : Location = locationListDict[c_tracing.location_id];
            const locationName = location.location_name;
            return new ViewCtracingDto(c_tracing.p_nric,locationName,date);
        });
        return result;
    }

}