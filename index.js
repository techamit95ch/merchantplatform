import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/products.js';
import dbConfig from './config/db.js';
import multer from 'multer';

// import upload from './middleware/upload.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
// app.listen(PORT);

// if (process.env.NODE_ENV ==="production") {
//   app.use(express.static("client/build/"))
// }

app.use((error, req, res, next) => {
  const message = `This is unnessary error => ${error.field}`;
  console.error(message);
  return res.status(500).send(message);
});

// app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use(upload.array());

app.use('/products', productRoutes);

dbConfig(app);
