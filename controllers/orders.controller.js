const Order = require("../models/Order");
const User = require("../models/User");
const config = require('../config/env');
const stripe = require('stripe')(config.STRIPE_KEY);

async function createOrder(req, res, next) {
    try {
        const user = await User.findDocumentById(res.locals.uid);
        const cart = res.locals.cart;
        const order = new Order({
            user: user,
            items: cart.items,
            totalPrice: cart.totalPrice
        });
        
        await order.save();

        req.session.cart = null;

        const session = await stripe.checkout.sessions.create({
            line_items: cart.items.map((item) => {
                return {
                    //If we store price on stripe servers, we can use
                    // price: '{{PRICE_ID}}'
                    //Otherwise we need to use
                    // price_data: {} (and config object manually)
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.product.title,
                        },
                        unit_amount: +item.product.price.toFixed(2) * 100 // unit_amount need value in cents
                    },
                    quantity: +item.quantity
                }
            }),
            mode: 'payment',
            success_url: `http://127.0.0.1:3000/orders/payment-success`,
            cancel_url: `http://127.0.0.1:3000/orders/payment-cancel`,
        });

        res.redirect(303, session.url);
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

function paymentSuccess(req, res) {
    res.render('customers/orders/success');
}

function paymentError(req, res) {
    res.render('customers/orders/error');
}

module.exports = {
    createOrder: createOrder,
    getOrders: getOrders,
    paymentError: paymentError,
    paymentSuccess: paymentSuccess
}