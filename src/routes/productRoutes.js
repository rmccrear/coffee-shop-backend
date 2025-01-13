'use strict';

const { admin, user, users } = require('../ACL');
const {
  newProduct,
  getByCategory,
  getProductById,
  deleteProductById,
  updateProductById,
} = require('../controllers/productControllers');
const validateProduct = require('../middleware/joi');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const upload = require('../middleware/upload');

const productRouterProtected = require('express').Router();
const productRouterUnprotected = require('express').Router();

productRouterProtected.post('/', auth, upload.single('image'), validateProduct, newProduct);
productRouterProtected.get('/', auth, getByCategory);
productRouterProtected.get('/:id', getProductById);
productRouterProtected.delete('/:id', auth, role(admin), deleteProductById);
productRouterProtected.put('/:id', auth, role(admin), updateProductById);

productRouterUnprotected.post('/', upload.single('image'), validateProduct, newProduct);
productRouterUnprotected.get('/', getByCategory);
productRouterUnprotected.get('/:id', getProductById);
productRouterUnprotected.delete('/:id', role(admin), deleteProductById);
productRouterUnprotected.put('/:id', role(admin), updateProductById);


module.exports = { productRouterProtected, productRouterUnprotected };
