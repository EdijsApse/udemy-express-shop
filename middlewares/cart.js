const Cart = require("../models/Cart");

function initCart(req, res, next) {
    let cart;

    if (!req.session.cart) {
        cart = new Cart();
    } else {
        cart = new Cart(req.session.cart.items, req.session.cart.totalQuantity, req.session.cart.totalPrice);
    }

    res.locals.cart = cart;
    next();
}

module.exports = initCart;