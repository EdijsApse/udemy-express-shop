const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/imageUpload');

router.get('/products', controller.getProducts);
router.post('/products', imageUploadMiddleware, controller.createProduct);

router.get('/products/new', controller.addProduct);

module.exports = router;