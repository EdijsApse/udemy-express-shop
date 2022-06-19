const express = require('express');
const router = express.Router();

const controller = require('../controllers/products.controller');

router.get('/products', controller.getProducts);
router.get('/products/:id', controller.getSingleProduct);

module.exports = router;