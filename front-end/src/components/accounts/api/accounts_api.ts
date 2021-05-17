import API from '../../../services/api';

export const getAccounts_API: () => Promise<any> = async () => {
    const result = await API.get('/e_user' );
    return result;
}

