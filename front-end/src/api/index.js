import axios from 'axios';

export const url = 'http://localhost:5000/';
export const fetchProducts = () => axios.get(`${url}products/`);
export const loginAuth = (auth) => axios.post(`${url}auth/login/`, auth);
export const addToCart = (post) => axios.post(`${url}cart/`, post);
export const fetchCarts = (post) => axios.post(`${url}cart/getCarts`, post);
export const orderAll = (post) => axios.post(`${url}cart/order`, post);
export const deleteCart = (id) => axios.delete(`${url}cart/${id}`);

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
