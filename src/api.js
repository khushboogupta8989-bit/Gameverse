import axios from 'axios';

const isRender =
  typeof window !== 'undefined' && window.location.hostname.includes('onrender.com');

const API_BASE =
  process.env.REACT_APP_API_URL ||
  (isRender ? 'https://gameverse-lp0x.onrender.com/api' : 'http://localhost:5000/api');

const API = axios.create({ baseURL: API_BASE });

// This interceptor automatically attaches the JWT token to every "real" request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});



export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const getProfile = () => API.get('/auth/profile');
// Add more as you go: export const fetchGames = () => API.get('/games');

export default API;