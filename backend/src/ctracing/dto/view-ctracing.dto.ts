export class ViewCtracingDto {
    p_nric: string;
    location_name: string;
    date: string;

    constructor(p_nric: string, location_name: string, date: string) {
        this.p_nric = p_nric;
        this.location_name = location_name;
        this.date = date;
    }

}