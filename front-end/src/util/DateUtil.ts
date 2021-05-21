export abstract class DateUtil {

    public static convertDateToString: (dateObj: Date) => string = (dateObj : Date) => JSON.stringify(dateObj);

    public static formatDate(x: any) {
        if(x === undefined || x === null || x === "") {
            return "N/A";
        }
        else {
            const formattedDate = x.toString();
            return formattedDate.substring(0,10);
        }
    }

}
