// Cart Routes

const express = require('express');
const router = express.Router();
const { getOrCreateCart, addProductToCart, removeProductFromCart } = require('../controllers/cartControllers');

const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.use(auth);
router.use(role(['user', 'admin']));

// router.get('/', getCarts);
router.post('/', getOrCreateCart);
router.put('/:id', addProductToCart);
router.delete('/:id', removeProductFromCart);

module.exports = router;
