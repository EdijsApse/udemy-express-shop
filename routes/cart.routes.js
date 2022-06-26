const express = require('express');
const router = express.Router();

const controller = require('../controllers/cart.controller');

const updateProductsMiddleware = require('../middlewares/updateCartProductPrices');

router.patch('/cart/:product_id/update-quantity', controller.changeProductQuantity)

router.post('/cart/:product_id', controller.addCartItem);

router.get('/cart', updateProductsMiddleware, controller.getCartItems);

module.exports = router;