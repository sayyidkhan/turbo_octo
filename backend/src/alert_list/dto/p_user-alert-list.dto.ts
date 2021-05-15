export class P_userAlertListDto {

    constructor(alertListId: number, alertTitle: string, alertDetail: string, alertDate: string, location_name: string) {
        this.alertListId = alertListId;
        this.alertTitle = alertTitle;
        this.alertDetail = alertDetail;
        this.alertDate = alertDate;
        this.location_name = location_name;
    }

    alertListId : number;
    alertTitle: string;
    alertDetail: string;
    alertDate: string;
    location_name: string;
}