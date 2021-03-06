import axios from 'axios';
const clientAxios = axios.create({
    baseURL: "http://localhost:5003/",
    //responseType: "json"
});

export default clientAxios;