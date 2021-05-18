import {Injectable} from "@nestjs/common";
import {CtracingService} from "./ctracing.service";


@Injectable()
export class Ctracing_reportService {
    constructor(private readonly ctracingService: CtracingService) {}

    async generateMonthlyReport() {

    }

}