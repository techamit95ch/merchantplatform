import express from 'express';
import { createProduct, getProducts } from '../controller/products.js';
import upload from '../middleware/upload.js';
// const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const cpUpload = upload.fields([{ name: 'mediaFile' }, { name: 'variantImg' }]);
// const cpUpload = upload.array('variantImg', 10)

router.get('/', getProducts);
// router.post('/', cpUpload, createProduct);
router.post('/',  createProduct);

export default router;
