import axios from 'axios';
import Constants from 'expo-constants';

const apiAuthenticated = (token) => {
  return axios.create({
    baseURL: Constants.expoConfig.extra.IP_LOCAL,
    headers: {
      'X-Custom-Header': 'foobar',
      'Authorization': `Bearer ${token}`
    }
  });
};

export default apiAuthenticated;