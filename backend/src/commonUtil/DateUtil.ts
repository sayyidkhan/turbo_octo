export abstract class DateUtil {

    public static convertDateToString = (dateInt : number) : string => {
        const newDate = new Date(dateInt). toLocaleDateString("en-US");
        return newDate;
    }


}
