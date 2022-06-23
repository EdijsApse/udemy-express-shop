const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");

async function createOrder(req, res, next) {
    try {
        const user = await User.findDocumentById(res.locals.uid);

        const order = new Order({
            user: user,
            items: res.locals.cart.items,
            totalPrice: res.locals.cart.totalPrice
        });
        
        await order.save();

        req.session.cart = null;

        res.redirect('/orders');
    } catch (err) {
        next(err);
    }
}

async function getOrders(req, res, next) {
    try {
        const orders = await Order.getOrdersByUserId(res.locals.uid);
        res.render('customer/orders/all-orders', {orders});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createOrder: createOrder,
    getOrders: getOrders
}