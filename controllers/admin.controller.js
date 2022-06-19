const Product = require("../models/Product");

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('admin/products/all-products', { products });
    } catch(err) {
        next(err);
    }
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
        res.redirect('/admin/products');
    } catch(err) {
        next(err);
    }
}

async function editProduct(req, res, next) {
    try {
        const product = await Product.getById(req.params.id);
        res.render('admin/products/update-product', { product })
    } catch(err) {
        next(err);
    }
}

async function updateProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        _id: req.params.id
    });

    if (req.file) {
        product.replaceImage(req.file.filename);
    }

    try {
        await product.save();
    } catch(err) {
        next(err);
        return;
    }

    res.redirect('/admin/products');
}

async function deleteProduct(req, res) {
    try {
        const product = await Product.getById(req.params.id);
        await product.deleteProduct();
        res.json({
            success: true,
            message: 'Product deleted!'
        });
    } catch(err) {
        res.json({
            success: false,
            message: 'Product not deleted! Try later!'
        });
    }
}

module.exports = {
    getProducts: getProducts,
    addProduct: addProduct,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    editProduct: editProduct,
    updateProduct: updateProduct
}