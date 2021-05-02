import API from '../../../services/api';

export const getAccounts_API: () => Promise<any> = async () => {
    const result = await API.get('/e_user' );
    return result;
}

export const postAccounts_API: (stateObject : any) => Promise<any> = async (stateObject : any) => {
    const result = await API.post('/e_user' ,stateObject);
    return result;
}
