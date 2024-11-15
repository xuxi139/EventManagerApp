import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Base URL for all API requests
});

export default api;
