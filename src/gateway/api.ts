import axios from 'axios';

const authData = sessionStorage.getItem('authData');

const token = authData ? JSON.parse(authData).token : '';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  },
});