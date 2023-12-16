// api.js
import axios from 'axios';
import {getUserAsyncStorage} from './helpers';

const axiosInstance = axios.create({
  baseURL: 'https://declut.mobislimited.com/api/v1',
});

// Request interceptor: Modify request config before sending
axiosInstance.interceptors.request.use(
  async config => {
    const user = await getUserAsyncStorage();
    const token = user ? user.access_token : null;
    // console.log(token, 'token from  item');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
    // You can modify headers, add authentication tokens, etc.
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor: Handle responses and errors
axiosInstance.interceptors.response.use(
  response => {
    // console.log(response,'response from the i')
    console.log(response?.data?.code==409, 're');
    if (response?.data?.code == 409 || response?.data?.code == 400) {
      return Promise.reject(response);
    } else {
      return response;
    }
    // You can modify response data before returning
  },
  error => {
    // console.log(error,'error from the interceptor')
    // Handle errors globally
    return Promise.reject(error);
  },
);

export default axiosInstance;
