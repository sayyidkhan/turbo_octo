export interface DateQuery {
    date_from : string;
    date_to : string;
}

export interface DateCompute {
    date_from : Date;
    date_to : Date;
}

export interface WeeklyQuery {
    month : number;
    year : number;
}

export interface PerMonth_CTracingListing {
    myList : any[],
    total_amount : number,
    north : number,
    south : number,
    east : number,
    west : number
}

export interface PerWeek_CTracingListing {
    myList : any[],
    week : number,
    total_amount : number,
    north : number,
    south : number,
    east : number,
    west : number
}

export interface PerMonth_VaccinesListing {
    myList : any[],
    total_amount : number,
}

export interface PerWeek_VaccinesListing {
    myList : any[],
    week : number,
    total_amount : number,
}

export abstract class ReportUtil {

    public static createDictCtracingForMonthly = (dto : DateCompute) => {
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

    public static createDictVaccinesForMonthly = (dto : DateCompute) => {
        const dateFrom : number =  dto.date_from.getMonth() + 1;
        const dateTo : number =  dto.date_to.getMonth() + 1;

        const myDict = {};

        if(dateFrom === dateTo) {
            const district_listing : PerMonth_VaccinesListing = {
                myList : [],
                total_amount : 0,
            };
            myDict[dateFrom] = district_listing;
            return myDict;
        }
        else{
            let counter = dateFrom;
            while (counter != dateTo + 1) {
                const district_listing : PerMonth_VaccinesListing = {
                    myList : [],
                    total_amount : 0,
                };
                myDict[counter] = district_listing;
                counter++;
            }
            return myDict;
        }
    }

    public static createDictCtracingForWeekly = () => {
        const myDict = {};

        let counter = 1;
        let max_week = 4;

        while (counter != max_week + 1) {
            const district_listing: PerWeek_CTracingListing = {
                myList: [],
                week: counter,
                total_amount: 0,
                north: 0,
                south: 0,
                east: 0,
                west: 0,
            };

            myDict[counter] = district_listing;
            counter++;
        }

        return myDict;
    }

    public static createDictVaccineForWeekly = () => {
        const myDict = {};

        let counter = 1;
        let max_week = 4;

        while (counter != max_week + 1) {
            const district_listing: PerWeek_VaccinesListing = {
                myList: [],
                week: counter,
                total_amount: 0,
            };

            myDict[counter] = district_listing;
            counter++;
        }

        return myDict;
    }

}