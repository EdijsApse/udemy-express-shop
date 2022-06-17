const Product = require("../models/Product");

function getProducts(req, res) {
    res.render('admin/products/all-products');
}

function addProduct(req, res) {
    res.render('admin/products/new-product');
}

async function createProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        image: req.file.filename
    });

    try {
        await product.save();
    } catch(err) {
        next(err);
        return;
    }

    res.redirect('/admin/products');
}

module.exports = {
    getProducts: getProducts,
    addProduct: addProduct,
    createProduct: createProduct
}