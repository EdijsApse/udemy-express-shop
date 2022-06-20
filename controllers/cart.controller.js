const Product = require('../models/Product');

async function addCartItem(req, res, next) {
    try {
        const cart = res.locals.cart;
        const product = await Product.getById(req.params.product_id)
        
        cart.addItem(product);
        req.session.cart = cart;
        
        res.status(201).json({
            success: true,
            message: 'Cart updated!',
            totalQuantity: cart.totalQuantity
        })

    } catch(err) {
        next(err);
        return;
    }
}

function removeCartItem(req, res, next) {
    
}

function getCartItems(req, res, next) {
    res.render('customer/cart/all-products');
}

module.exports = {
    addCartItem: addCartItem,
    removeCartItem: removeCartItem,
    getCartItems: getCartItems
}