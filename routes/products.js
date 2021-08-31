const express = require ('express')
const router = express.Router();
const {createProduct, getProducts} = require('../controller/products');
router.get('/',getProducts);
router.post('/',createProduct);

module.exports = router;