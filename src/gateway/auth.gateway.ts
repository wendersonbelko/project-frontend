import { api } from './api';

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const register = async (email: string, password: string, cpf: string, phoneNumber: string, fullName: string, dateOfBirth: Date) => {
  try {
    const response = await api.post('/auth/register', { email, password, cpf, phone: phoneNumber, name: fullName, birthdate: dateOfBirth});
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}