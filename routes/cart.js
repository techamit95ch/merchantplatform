import express from 'express';
import {
  closeCart,
  deleteCart,
  getCarts,
  createCart,
} from '../controller/cart.js';

const router = express.Router();
router.post('/getcart', getCarts);
router.post('/', createCart);
router.post('/order', closeCart);
router.delete('/:id', deleteCart);
