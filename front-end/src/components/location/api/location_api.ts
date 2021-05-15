import API from '../../../services/api';

export const getAllLocations: () => Promise<any> = async () => {
    const result = await API.get('/locations' );
    return result;
}

/*export const getLocationById: (location_id : number) => Promise<any> = async (location_id) => {
    const result = await API.get(`/locations/${location_id}`);
}*/

export const postNewUser_API: (stateObject : any) => Promise<any> = async (stateObject : any) => {
    const result = await API.post('/users' ,stateObject);
    return result;
}

/* sample code to construct API (FOR : GET, POST ):
https://github.com/nadavpodjarski/postgres-nest-react-typescript-boilerplate/blob/master/client/src/api/todo/index.ts
 */

// API-LAYER, to connect with controller on the backend
// (API-LAYER) -> (REACT-COMPONENT) -> (PAGE)
// only use this layer, to get the data from the API URL. do not do any processing of data here.