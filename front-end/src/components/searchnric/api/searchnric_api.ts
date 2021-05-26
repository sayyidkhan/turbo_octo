import API from '../../../services/api';

export const searchnric_API: (nric : string) => Promise<any> = async (nric : string) => {
    const result = await API.get(`c_tracing/searchbynric/${nric}`);
    return result;
}

export const VTsearchnric_API: (nric : string) => Promise<any> = async (nric : string) => {
    const result = await API.get(`vaccines/p_user/${nric}`);
    return result;
}

export const searchENRIC_API: (nric : string) => Promise<any> = async (nric : string) => {
    const result = await API.get(`e_user/${nric}`);
    return result;
}
