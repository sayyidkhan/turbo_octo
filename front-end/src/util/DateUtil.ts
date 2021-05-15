export abstract class DateUtil {

    public static convertDateToString: (dateObj: Date) => string = (dateObj : Date) => JSON.stringify(dateObj);

}
