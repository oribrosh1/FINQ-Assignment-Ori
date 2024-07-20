import axios from 'axios';
import { getHeaders } from './headers';

export const axiosInstance = axios.create({
    baseURL: `http://localhost:8080/api/users`, // Adjust this base URL as per your actual backend URL
    headers: getHeaders()
});