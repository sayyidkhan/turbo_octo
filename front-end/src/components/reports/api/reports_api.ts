import API from '../../../services/api';

export const getVaccine_API: () => Promise<any> = async () => {
    const result = await API.get('/vaccines' );
    return result;
}

export const postVaccine_API: (stateObject : any) => Promise<any> = async (stateObject : any) => {
    const result = await API.post('/vaccines' ,stateObject);
    return result;
}