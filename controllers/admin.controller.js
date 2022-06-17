function getProducts(req, res) {
    res.render('admin/products/all-products');
}

function addProduct(req, res) {
    res.render('admin/products/new-product');
}

function createProduct(req, res) {
    res.redirect('/admin/products');
}

module.exports = {
    getProducts: getProducts,
    addProduct: addProduct,
    createProduct: createProduct
}