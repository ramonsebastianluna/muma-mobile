import axios from 'axios';

const apiAuthenticated = (token) => {
  return axios.create({
    baseURL: 'http://192.168.0.106:8081/api',
    //baseURL: 'http://10.0.2.2:8081/api',
    headers: {
      'X-Custom-Header': 'foobar',
      'Authorization': `Bearer ${token}`
    }
  });
};

export default apiAuthenticated;