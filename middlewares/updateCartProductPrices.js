async function updateCartProductPrices(req, res, next) {
    const cart = res.locals.cart;

    await cart.updateProducts();

    next();
}

module.exports = updateCartProductPrices;