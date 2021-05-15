import API from '../../../services/api';

export const enterLoc_API: () => Promise<any> = async () => {
    const result = await API.get('/enterloc' );
    return result;
}

export const postEnterLoc_API: (stateObject : any) => Promise<any> = async (dto : any) => {
    const result = await API.post('/c_tracing' ,dto);
    return result;
}