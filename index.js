'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const cors = require('cors');
const baseRouter = require('./src/routes/baseRoutes');
const { error } = require('./src/middleware/error');
const mongooseConnect = require('./database');
const notFound = require('./src/middleware/notFound404');
const productRouter = require('./src/routes/productRoutes');
const userRouter = require('./src/routes/userRoutes');
const cartRouter = require('./src/routes/cartRoutes');

// Middleware
app.use(express.json());
app.use(cors());
app.use(baseRouter);

// REST API Endpoints
app.use('/api/v2/products', productRouter);
app.use('/api/v2/users', userRouter);
app.use('/api/v2/cart', cartRouter);

// for 404
// This must be the last middleware before error handling, and after all routes
app.use(notFound);

// for errors
// This must be the last middleware, and after all routes
app.use(error);

mongooseConnect().catch((err) => console.error(err)).then(() => {
  console.log('Mongoose connected!');
  app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
  });
});
