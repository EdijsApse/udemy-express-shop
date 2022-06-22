const Cart = require('../models/Cart');
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

function changeProductQuantity(req, res, next) {
    try {
        const cart = res.locals.cart;
        cart.updateProductQuantity(req.body.quantity, req.params.product_id);
        req.session.cart = cart;

        res.json({
            success: true,
            data: {
                item: cart.findProductById(req.params.product_id),
                cartTotalPrice: cart.totalPrice,
                cartTotalQuantity: cart.totalQuantity
            }
        })
    } catch(err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    addCartItem: addCartItem,
    removeCartItem: removeCartItem,
    getCartItems: getCartItems,
    changeProductQuantity: changeProductQuantity
}