import express from 'express';
import { signIn, logIn } from '../controller/auth.js';
import upload from '../middleware/upload.js';
// const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// const cpUpload = upload.array('variantImg', 10)

router.get('/', logIn);
// router.post('/', cpUpload, createProduct);
router.post('/', signIn);

export default router;
