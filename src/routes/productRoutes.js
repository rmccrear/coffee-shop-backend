'use strict';

const { admin, user, users } = require('../ACL');
const {
  newProduct,
  getByCategory,
  getProductById,
  deleteProductById,
  updateProductById,
} = require('../controllers/productControllers');
const role = require('../middleware/role');

const productRouter = require('express').Router();

productRouter.route('/').post(newProduct).get(getByCategory);

productRouter
  .route('/:id')
  .get(getProductById)
  .delete(role(admin), deleteProductById)
  .put(role(admin), updateProductById);
productRouter
  .route('/:id/purchase')
  .put(role(user), (req, res) => res.send('Future Feature!'));
module.exports = productRouter;
