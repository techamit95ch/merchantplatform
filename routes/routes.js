import express from 'express';
import { createProduct, getProducts } from '../controller/products.js';
import multer from 'multer';
import path from 'path'; // for getting file extension
// import uuidv4 from 'uuidv4'; // for naming files with random characters
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
//   const upload = multer({ storage: storage }).single('mediaFile');
const upload = multer({ dest: 'uploads/' });
//   const cpUpload = upload.fields([
//     { name: 'mediaFile', maxCount: 1 },
//     { name: 'variantImg', maxCount: 3 },
//   ]);

router.get('/', getProducts);
router.post('/', upload.single('mediaFile'), createProduct);

export default router;
