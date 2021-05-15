import API from '../../../services/api';

export const activeAlertListOnly: () => Promise<any> = async () => {
    const result = await API.get('/alertlist/filterlist/true' );
    return result;
}