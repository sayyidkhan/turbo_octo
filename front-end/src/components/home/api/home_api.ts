import API from '../../../services/api';

export const getHello_API: () => Promise<any> = async () => {
    const result = await API.get('/start' );
    return result;
}

/* sample code to construct API (FOR : GET, POST ):
https://github.com/nadavpodjarski/postgres-nest-react-typescript-boilerplate/blob/master/client/src/api/todo/index.ts
 */

// API-LAYER, to connect with controller on the backend
// (API-LAYER) -> (REACT-COMPONENT) -> (PAGE)
// only use this layer, to get the data from the API URL. do not do any processing of data here.