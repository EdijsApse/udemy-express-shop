const express = require('express');
const router = express.Router();

const controller = require('../controllers/orders.controller');

const { passIfUser, passIfItemsInCart } = require('../middlewares/protectRoutes');

const updateProductsMiddleware = require('../middlewares/updateCartProductPrices');

router.get('/payment-cancel', controller.paymentError);
router.get('payment-success', controller.paymentSuccess);

router.post('/', passIfUser, updateProductsMiddleware, passIfItemsInCart, controller.createOrder);
router.get('/', passIfUser, controller.getOrders);

module.exports = router;