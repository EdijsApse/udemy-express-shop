const express = require('express');
const router = express.Router();

const controller = require('../controllers/orders.controller');

const { passIfUser } = require('../middlewares/protectRoutes');

const updateProductsMiddleware = require('../middlewares/updateCartProductPrices');

router.post('/', passIfUser, updateProductsMiddleware, controller.createOrder);
router.get('/', passIfUser, controller.getOrders);

module.exports = router;