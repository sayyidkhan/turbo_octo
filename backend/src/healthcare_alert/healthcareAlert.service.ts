import {Injectable} from "@nestjs/common";
import {HealthCareAlertRepository} from "./healthcareAlert.repository";
import {HealthcareAlert} from "./schemas/healthcareAlert.schema";
import {PersistUpdateHealthcareAlertsDto, UpdateHealthcareAlertsDto} from "./dto/update-healthcareAlerts.dto";
import {PersistAlertListDto} from "../alert_list/dto/alert-list.dto";

@Injectable()
export class HealthcareAlertService {
    constructor(private readonly healthCareAlertRepository: HealthCareAlertRepository) {}

    async getHealthcareAlertByID(healthcareAlertId: number): Promise<HealthcareAlert> {
        return this.healthCareAlertRepository.findOne({ healthcareAlertId : healthcareAlertId })
    }

    async getAllHealthcareAlerts(): Promise<HealthcareAlert[]> {
        return this.healthCareAlertRepository.find({});
    }

    async getMaxAlertListId() : Promise<number> {
        return this.healthCareAlertRepository.getMaxAlertListId();
    }

    async createNewHealthcareAlerts(
        date: Date,
        location_id:number,
        description : string,
        e_nric : string): Promise<HealthcareAlert> {
        const highestAlertListId : number = await this.getMaxAlertListId();
        const persistence = {
            //increment the id if there is an existing alertId, otherwise initalise at 1
            healthcareAlertId: (highestAlertListId > 0) ? highestAlertListId + 1 : 1,
            date: date,
            location_id: location_id,
            description: description,
            e_nric: e_nric,
        };
        return this.healthCareAlertRepository.create(persistence);
    }

    async updateHealthcareAlertByID(healthcareAlertId: number, dto: UpdateHealthcareAlertsDto): Promise<HealthcareAlert> {
        const persistence = new PersistUpdateHealthcareAlertsDto(dto);
        return this.healthCareAlertRepository.findOneAndUpdate({ healthcareAlertId : healthcareAlertId}, persistence);
    }


 
}