import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return config;
});

export const authApi = {
  login: async (credentials) => {
    const { data } = await api.post('/auth/jwt/create/', credentials);
    return data;
  },
  forgotPassword: async (email) => {
    await api.post('/auth/users/reset_password/', { email });
  },
  resetPassword: async (payload) => {
    await api.post('/auth/users/reset_password_confirm/', payload);
  },
};
