import axios from 'axios';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8081/api',
});

export default api;