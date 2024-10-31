import axios from 'axios';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: Constants.expoConfig.extra.IP_LOCAL,
});

export default api;