const express = require('express');
const router = express.Router();

const controller = require('../controllers/cart.controller');

router.post('/cart/:product_id', controller.addCartItem);
router.delete('/cart/:product_id', controller.removeCartItem);

router.get('/cart', controller.getCartItems);

module.exports = router;