import axios from 'axios';

export const url = 'http://localhost:5000/';
export const fetchProducts = () => axios.get(`${url}products/`);
export const loginAuth = () => axios.post(`${url}auth/login/`);

export const createProduct = (newProduct) =>
  axios.post(`${url}products/`, newProduct, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const signInAuth = (auth) =>
  axios.post(`${url}auth/signin/`, auth, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const isLoggedInAuth = (auth) =>
  axios.post(`${url}auth/isLoggedIn/`, auth);
export const logOutAuth = (auth) => axios.post(`${url}auth/logout/`, auth);
