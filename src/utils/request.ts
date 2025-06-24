// src/utils/request.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.20.10.7:8080', // 后端地址
  timeout: 5000
});

// 请求拦截器：请求发出前自动附加 token
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('satoken');
  if (token) {
    config.headers.Authorization = 'satoken ' + token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
