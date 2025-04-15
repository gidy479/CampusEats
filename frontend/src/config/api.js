import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  // Menu endpoints
  MENU: {
    GET_ALL: '/menu',
    GET_ONE: (id) => `/menu/${id}`,
    CREATE: '/menu',
    UPDATE: (id) => `/menu/${id}`,
    DELETE: (id) => `/menu/${id}`,
  },
  // Order endpoints
  ORDERS: {
    GET_ALL: '/orders',
    GET_ONE: (id) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE_STATUS: (id) => `/orders/${id}/status`,
    UPDATE_PAYMENT: (id) => `/orders/${id}/payment`,
  },
  // User endpoints
  USERS: {
    GET_ALL: '/users',
    GET_ONE: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
}; 