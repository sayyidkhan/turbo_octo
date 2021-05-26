import API from '../../../services/api';

export const alertlist: () => Promise<any> = async () => {
    const result = await API.get('/alertlist/filterlist/true' );
    return result;
}

export const alertlistfull: () => Promise<any> = async () => {
    const result = await API.get('/alertlist' );
    return result;
}

export const searchAlertByDistrict_API: (district : string) => Promise<any> = async (district : string) => {
    const result = await API.get(`/alertlist/alertlist_by_district/${district}`);
    return result;
}

export const searchAlertByLocationId_API: (locationid : string) => Promise<any> = async (locationid : string) => {
    const result = await API.get(`/alertlist/alertlist_by_locationid/${locationid}`);
    return result;
}
