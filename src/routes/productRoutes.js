'use strict';

const {
  newProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require('../controllers/productControllers');

const productRouter = require('express').Router();

productRouter.route('/').post(newProduct).get(getProducts);

productRouter
  .route('/:id')
  .get(getProductById)
  .delete(deleteProductById)
  .put(updateProductById);

module.exports = productRouter;
