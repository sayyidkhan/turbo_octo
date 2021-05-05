export class ViewCtracingDto {
    p_nric: string;
    location_id: number;
    date: string;

    constructor(p_nric: string, location_id: number, date: string) {
        this.p_nric = p_nric;
        this.location_id = location_id;
        this.date = date;
    }

}