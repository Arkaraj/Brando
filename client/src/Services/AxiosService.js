import axios from 'axios';
import { backendUrl } from '../constants/constants';

export const axiosClient = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export function throwDataOnError(error) {
  if (error.response && error.response.data) {
    return error.response.data;
  }
  throw error;
}

export const fetchCorsConfig = {
  credentials: 'include',
};
