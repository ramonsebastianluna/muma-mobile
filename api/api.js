import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8081/api',
});

export default api;

//10.0.2.2