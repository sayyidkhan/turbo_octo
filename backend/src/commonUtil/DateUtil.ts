export abstract class DateUtil {

    public static convertStrToDate = (dateString : string) : Date => {
        try {
            return new Date(dateString);
        }
        catch (e) {
            console.log("invalid date format");
            return null;
        }
    }

}
