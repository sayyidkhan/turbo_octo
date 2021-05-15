export abstract class DateUtil {

    public static convertStrToDate = (dateString : string) : Date => {
        const result = new Date(dateString);
        const validate = result.toString();
        const error = 'Invalid Date';
        if(validate !== error) {
            return result;
        }
        else {
            console.log("invalid date format");
            return null;
        }
    }

}
