import API from '../../../services/api';

export const postMonthlyCTReport_API: (stateObject : any) => Promise<any> = async (stateObject : any) => {
    const result = await API.post('/c_tracing/report/monthly/', stateObject);
    return result;
}

export const postWeeklyCTReport_API: (stateObject : any) => Promise<any> = async (stateObject : any) => {
    const result = await API.post('/c_tracing/report/weekly/', stateObject);
    return result;
}

export const postMonthlyVaccReport_API: (stateObject : any) => Promise<any> = async (stateObject : any) => {
    const result = await API.post('/vaccines/report/monthly/', stateObject);
    return result;
}

export const postWeeklyVaccReport_API: (stateObject : any) => Promise<any> = async (stateObject : any) => {
    const result = await API.post('/vaccines/report/weekly/', stateObject);
    return result;
}