import {Injectable} from "@nestjs/common";
import {AlertListDto} from "./dto/alert-list.dto";

import {AlertList} from "./schemas/alertList.schema";
import {AlertListRepository} from "./alertList.repository";

@Injectable()
export class AlertListService {
    constructor(private readonly alertListRepository: AlertListRepository) {}

    async getAlertById(alertListId: number): Promise<AlertList> {
        return this.alertListRepository.findOne({ alertListId : alertListId })
    }

    async getAllAlerts(): Promise<AlertList[]> {
        return this.alertListRepository.find({});
    }

    async getOnlyActiveAlerts(): Promise<AlertList[]> {
        return this.alertListRepository.find({active : true});
    }

    async getMaxAlertListId() : Promise<number> {
        return this.alertListRepository.getMaxAlertListId();
    }

    async createAlert(
        alertTitle: string,
        alertDetail: string,
        alertDate : number,
        active : boolean,
        location_id : number,
        ): Promise<AlertList> {
        const highestAlertListId : number = await this.getMaxAlertListId();
        const persistence = {
            //increment the id if there is an existing alertId, otherwise initalise at 1
            alertListId: (highestAlertListId > 0) ? highestAlertListId + 1 : 1,
            alertTitle : alertTitle,
            alertDetail : alertDetail,
            alertDate : alertDate,
            active : active,
            location_id: location_id,
        };
        return this.alertListRepository.create(persistence);
    }

    async updateAlertById(alertListId: number, alertListDto: AlertListDto): Promise<AlertList> {
        return this.alertListRepository.findOneAndUpdate({ alertListId : alertListId }, alertListDto);
    }

    async deleteAlertListById(alertId: number): Promise<AlertList> {
        const findAlertId = await this.getAlertById(alertId);
        //check alert list in record, if not return null
        // only record exist then perform delete
        console.log(findAlertId);
        if(findAlertId != null) {
            return this.alertListRepository.deleteAlertListById({ _id : findAlertId['_id'] });
        }
        return null;
    }

}