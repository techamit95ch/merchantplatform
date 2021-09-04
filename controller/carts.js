import mongoose from 'mongoose';
import Cart from '../models/cart.js';
import upload from '../middleware/upload.js';
import multer from 'multer';

export const getCarts = async (req, res, next) => {
  try {
    const Carts = await Cart.find({ email: req.body.email, status: true });

    res.status(202).json(Carts);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
};
export const createCart = async (req, res, next) => {
  try {
    const newCart = new Cart(req.body);
    await newCart
      .save()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err.message });
      });
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
};
export const deleteCart = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Cart with id: ${id}`);

  await Cart.findByIdAndRemove(id);

  res.json({ message: 'Cart deleted successfully.' });
};
export const closeCart = async (req, res) => {
  const { email } = req.body;

  await Cart.updateMany(
    { email: email },
    { status: false },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(docs);

        console.log('Updated Docs : ', docs);
      }
    }
  );
};
