import API from '../../../services/api';

export const getUsers_API: (e_nric : any) => Promise<any> = async () => {
    const result = await API.get('/e_user');
    return result;
}

