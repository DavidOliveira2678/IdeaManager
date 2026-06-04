import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5047/api'
});

export default api;