import API from '../../../services/api';

export const postMonthlyReport_API: (stateObject : any) => Promise<any> = async (stateObject : any) => {
    const result = await API.post('/c_tracing/report/monthly/' ,stateObject);
    return result;
}

export const postWeeklyReport_API: (stateObject : any) => Promise<any> = async (stateObject : any) => {
    const result = await API.post('/c_tracing/report/weekly/' ,stateObject);
    return result;
}