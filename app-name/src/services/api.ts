import axios from 'axios';

//change the port the number to be the same backend port number, in order for the api to be able to talk
export default axios.create({
    baseURL : 'http://localhost:5000'
});