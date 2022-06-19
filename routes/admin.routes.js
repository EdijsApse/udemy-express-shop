const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/imageUpload');

router.get('/products', controller.getProducts);
router.post('/products', imageUploadMiddleware, controller.createProduct);

router.get('/products/new', controller.addProduct);

router.get('/products/:id', controller.editProduct);
router.post('/products/:id', imageUploadMiddleware, controller.updateProduct);
router.delete('/products/:id', controller.deleteProduct);

module.exports = router;