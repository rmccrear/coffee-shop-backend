'use strict';

const Product = require('../models/Product');

async function newProduct(req, res, next) {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Not Found!' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProductById(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Not Found!' });
    }
    res.status(204).json({ message: 'deleted' });
  } catch (error) {
    next(error);
  }
}

async function updateProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock ?? product.stock;
    product.imageUrl = req.body.imageUrl || product.imageUrl;
    await product.save();

    if (!product) {
      return res.status(404).json({ error: 'Not Found!' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  newProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
