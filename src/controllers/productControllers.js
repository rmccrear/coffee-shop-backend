'use strict';

const Product = require('../models/Product');

async function newProduct(req, res, next) {
  try {
    const { name, description, price, category, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl: req.file ? req.file.path : undefined,
    });
    await product.save();
    res.status(201).json(product);
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

async function getByCategory(req, res, next) {
  try {
    // localhost:3001/products?category="drinks"
    const {
      page = 1,
      limit = 10,
      category,
      sortBy,
      sortOrder = 'asc',
    } = req.query; // "drinks"

    const filter = category ? { category } : {};

    const sort = sortBy ? { [sortBy]: sortOrder === 'asc' ? 1 : -1 } : {};
    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  newProduct,
  getByCategory,
  getProductById,
  deleteProductById,
  updateProductById,
};
