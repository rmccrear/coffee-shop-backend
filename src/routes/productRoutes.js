'use strict';

const {
  newProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require('../controllers/productControllers');
const role = require('../middleware/role');

const productRouter = require('express').Router();

productRouter.route('/').post(newProduct).get(getProducts);

productRouter
  .route('/:id')
  .get(getProductById)
  .delete(role(['admin']), deleteProductById)
  .put(updateProductById);

module.exports = productRouter;
