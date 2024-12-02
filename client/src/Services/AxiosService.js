import axios from 'axios';
import { backendUrl } from '../constants/constants';

export const axiosClient = axios.create({
    baseURL: backendUrl,
    withCredentials: true    
})