const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const productRoutes = require('./routes/products');
const productFiles = require('./routes/postFiles');
const dbConfig = require('./config/db');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});
app.use((req, res, next) => {
  const errors = new Error('Not Found');
  errors.status = 404;
  next(errors);
});
app.use((errors, req, res, next) => {
  res.status(errors.status || 500);
  res.json({
    error: {
      message: errors.message,
    },
  });
});

// Products

app.use('/products', productRoutes);
app.post('/postfiles', productFiles);

// const port = process.env.PORT || 5000;

dbConfig(app);
