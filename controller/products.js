import mongoose from 'mongoose';
import Product from '../models/product.js';
import upload from '../middleware/upload.js';
import multer from 'multer';

export const createProduct = async (req, res) => {
  try {
    // console.log('from create product', req);

    const cpUpload = upload.fields([
      { name: 'mediaFile', maxCount: 1 },
      { name: 'variantImg', maxCount: 10 },
    ]);
    await cpUpload(req, res, async function (err) {
      const url = req.protocol + '://' + req.get('host');

      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        // res.statusCode = 400;
        // res.send(err.code);
        res.status(400).json({ success: false, message: err.code });
      } else if (err) {
        // An unknown error occurred when uploading.
        // res.statusCode = 500;
        // res.send(err.message);
        res.status(500).json({ success: false, message: err.message });
      }
      const { title, description, seoTitle, seoDescription, variantDetails } =
        req.body;

      // console.log(req.files);

      const mediaFile = url + '/uploads/' + req.files.mediaFile[0].filename;
      // const mediaFile = url + '/uploads/' +req.files.mediaFile[0].path;
      // const variantImg = url + '/uploads/' +req.files.variantImg.map((item) => item.path);
      const variantImg = req.files.variantImg.map((item) => {
        return `${url}/uploads/${item.filename}`;
      });

      const newProduct = new Product({
        title: title,
        description: description,
        variantDetails: variantDetails,
        mediaFile: mediaFile,
        variantImg: variantImg,
        seoTitle: seoTitle,
        seoDescription: seoDescription,
      });
      try {
        await newProduct
          .save()
          .then((doc) => {
            res.status(201).json({ success: true, data: doc });
          })
          .catch((err) => {
            res.status(400).json({ success: false, message: err.message });
          });
        // res.status(201).json({ success: true, data: newProduct });
        // console.log(newProduct);
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }

      // res.status(200).json(variantImg);
    });
  } catch (e) {
    // console.log(e.message);
    res.status(400).json({ success: false, message: e.message });
  }
};
export const getProducts = async (req, res, next) => {
  try {
    const Products = await Product.find();
    /* const products = Products.map((item) => {
      let variantImg = item.variantImg.map(
        (path) => `${req.headers.host}/${path}`
      );
      item.variantImg = variantImg;
      item.mediaFile = `${req.headers.host}/${item.mediaFile}`;
      return item;
    }); */
    // console.log(req.headers.host);
    // res.status(202).json(products);
    res.status(202).json(Products);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
};
