import express from 'express';
import {
  closeCart,
  deleteCart,
  getCarts,
  createCart,
} from '../controller/carts.js';

const router = express.Router();
router.post('/getCarts', getCarts);
router.post('/', createCart);
router.post('/order', closeCart);
router.delete('/:id', deleteCart);
export default router;
