import mongoose from 'mongoose';
import Auth from '../models/auth.js';
import upload from '../middleware/upload.js';
import multer from 'multer';

export const signIn = async (req, res) => {
  try {
    const cpUpload = upload.single('img');
    await cpUpload(req, res, async function (err) {
      const url = req.protocol + '://' + req.get('host');
      if (err instanceof multer.MulterError) {
        res.status(400).json({ success: false, message: err.code });
      } else if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
      const { name, email, password } = req.body;
      console.log(req.files);
    });
  } catch (err) {
    console.log(err);
  }
};
export const logIn = async (req, res) => {};
