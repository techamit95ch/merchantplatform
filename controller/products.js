const mongoose = require('mongoose');
const Product = require('../models/product');
const createProduct = async (req, res, next) => {
  try {
    const { title, description, media, variants, seoMeta, seoDescription } =
      req.body;
    const newProduct = new Product({
      title,
      description,
      media,
      variants,
      seoMeta,
      seoDescription,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
};
const getProducts = async (req, res, next) => {
  try {
    const Products = await Product.find();
    res.status(202).json(Products);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
};

module.exports = { createProduct, getProducts };
