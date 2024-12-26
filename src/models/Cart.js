// Cart.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true, });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
