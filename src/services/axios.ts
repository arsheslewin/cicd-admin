import axios from 'axios';

import { STORAGE_KEY } from 'constant';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  function (axios_config: any) {
    const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (token) axios_config.headers.Authorization = `Bearer ${token}`;
    return axios_config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axios;
