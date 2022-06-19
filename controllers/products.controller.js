const Product = require("../models/Product")

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('customer/products/all-products', { products })
    } catch(err) {
        next(err);
    }
}

async function getSingleProduct(req, res, next) {
    try {
        const product = await Product.getById(req.params.id);
        res.render('customer/products/single-product', { product })
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getProducts: getProducts,
    getSingleProduct: getSingleProduct
}