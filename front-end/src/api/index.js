import axios from 'axios';

export const url = 'http://localhost:5000/';
export const fetchProducts = () => axios.get(`${url}products/`);

export const createProduct = (newProduct) =>
  axios.post(`${url}products/`, newProduct, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
