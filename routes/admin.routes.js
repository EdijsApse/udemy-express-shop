const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');

router.get('/products', controller.getProducts);
router.post('/products', controller.createProduct);

router.get('/products/new', controller.addProduct);

module.exports = router;