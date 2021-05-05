export abstract class DateUtil {

    public static convertDateToInt = (dateString : string) : number => {
        return new Date(dateString).getTime();
    }

}
