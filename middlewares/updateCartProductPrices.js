async function updateCartProductPrices(req, res, next) {
    const cart = res.locals.cart;

    await cart.updateProducts();

    req.session.cart = cart;

    next();
}

module.exports = updateCartProductPrices;