import API from '../../../services/api';

export const healthadvise_API: () => Promise<any> = async () => {
    const result = await API.get('/healthcare_alert' );
    return result;
}
