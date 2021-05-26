import {Injectable} from "@nestjs/common";
import {PersistAlertListDto} from "./dto/alert-list.dto";

import {AlertList} from "./schemas/alertList.schema";
import {AlertListRepository} from "./alertList.repository";

@Injectable()
export class AlertListService {
    constructor(
        private readonly alertListRepository: AlertListRepository,) {}

    async getAlertById(alertListId: number): Promise<AlertList> {
        return this.alertListRepository.findOne({ alertListId : alertListId })
    }

    async getAllAlerts(): Promise<AlertList[]> {
        return this.alertListRepository.find({});
    }

    async getAlertsWithQuery(query): Promise<AlertList[]> {
        return this.alertListRepository.find(query);
    }

    async getMaxAlertListId() : Promise<number> {
        return this.alertListRepository.getMaxAlertListId();
    }

    setAlertListId(highestAlertListId: number) {
        return (highestAlertListId > 0) ? highestAlertListId + 1 : 1;
    }

    async createAlert(
        alertTitle: string,
        alertDetail: string,
        alertDate : Date,
        active : boolean,
        location_id : number,
        ): Promise<AlertList> {
        const highestAlertListId : number = await this.getMaxAlertListId();
        const persistence = {
            //increment the id if there is an existing alertId, otherwise initalise at 1
            alertListId: this.setAlertListId(highestAlertListId),
            alertTitle : alertTitle,
            alertDetail : alertDetail,
            alertDate : alertDate,
            active : active,
            location_id: location_id,
        };
        return this.alertListRepository.create(persistence);
    }

    async updateAlertById(alertListId: number, dto: PersistAlertListDto): Promise<AlertList> {
        return this.alertListRepository.findOneAndUpdate({ alertListId : alertListId }, dto);
    }

    async deleteAlertListById(alertId: number): Promise<AlertList> {
        const findAlertId = await this.getAlertById(alertId);
        //check alert list in record, if not return null
        // only record exist then perform delete
        console.log(findAlertId);
        if(findAlertId != null) {
            const result = this.alertListRepository.deleteAlertListById({ _id : findAlertId['_id'] });
            return result;
        }
        return null;
    }

}