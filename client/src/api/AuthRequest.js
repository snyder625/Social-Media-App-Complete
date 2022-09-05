import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const LogIn = (formData) => API.post('/auth/login', formData)
export const SignUp = (formData) => API.post('/auth/register', formData)