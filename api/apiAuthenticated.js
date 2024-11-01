import axios from 'axios';
import Constants from 'expo-constants';

const apiAuthenticated = (token) => {
  return axios.create({
    baseURL: 'http://10.0.2.2:8081/api',
    headers: {
      'X-Custom-Header': 'foobar',
      'Authorization': `Bearer ${token}`
    }
  });
};

export default apiAuthenticated;