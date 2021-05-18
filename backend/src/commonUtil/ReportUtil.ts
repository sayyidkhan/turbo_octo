


export interface DateQuery {
    date_from : string;
    date_to : string;
}

export interface DateCompute {
    date_from : Date;
    date_to : Date;
}

export interface PerMonth_CTracingListing {
    myList : any[],
    total_amount : number,
    north : number,
    south : number,
    east : number,
    west : number
}

export abstract class ReportUtil {

    public static createCalendarDict_ForMonthly = (dto : DateCompute) => {
        const dateFrom : number =  dto.date_from.getMonth() + 1;
        const dateTo : number =  dto.date_to.getMonth() + 1;

        const myDict = {};

        if(dateFrom === dateTo) {
            const district_listing : PerMonth_CTracingListing = {
                myList : [],
                total_amount : 0,
                north : 0,
                south : 0,
                east : 0,
                west : 0,
            };
            myDict[dateFrom] = district_listing;
            return myDict;
        }
        else{
            let counter = dateFrom;
            while (counter != dateTo + 1) {
                const district_listing : PerMonth_CTracingListing = {
                    myList : [],
                    total_amount : 0,
                    north : 0,
                    south : 0,
                    east : 0,
                    west : 0,
                };
                myDict[counter] = district_listing;
                counter++;
            }
            return myDict;
        }
    }

}