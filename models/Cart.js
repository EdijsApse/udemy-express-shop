const { ObjectId } = require("mongodb");
const Product = require('./Product');

class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }
    
    addItem(product) {
        const cartItem = {
            quantity: 1,
            product: product,
            totalPrice: +product.price
        }

        let item = this.findProductById(product.id);
        
        if (item) {
            item.quantity = item.quantity + 1;
            item.totalPrice = +(item.totalPrice + product.price).toFixed(2);
        } else {
            this.items.push(cartItem);
        }

        this.totalQuantity++;
        this.totalPrice = +(this.totalPrice + product.price).toFixed(2);
    }

    updateProductQuantity(quantity, product_id) {
        const item = this.findProductById(product_id);

        if (quantity < 0 || isNaN(quantity)) {
            const error = new Error('Quantity should be a valid number!');
            throw error;
        }

        if (!item) {
            const error = new Error('Product not found!');
            error.code = 404;
            throw error;
        }

        item.quantity = +quantity;
        item.totalPrice = +(quantity * item.product.price).toFixed(2);

        this.updateCartTotals();
    }

    updateCartTotals() {
        this.totalPrice = +(this.items.reduce((currentValue, nextItem) => {
            return currentValue + nextItem.totalPrice;
        }, 0)).toFixed(2);

        this.totalQuantity = this.items.reduce((currentValue, nextItem) => {
            return currentValue + nextItem.quantity;
        }, 0);
    }

    findProductById(product_id) {
        return this.items.find((item) => {
            return item.product.id == product_id;
        });
    }

    async updateProducts() {
        //Getting IDs for products that are in the cart
        const productIds = this.items.map(item => {
            return new ObjectId(item.product.id);
        });
        
        //Getting products from db, that are in the cart
        const products = await Product.findAll({ _id: { $in: productIds }});

        //map over all products
        const items = products.map(product => {
            //Find item that was in the cart by product
            const cartItem = this.items.find(item => {
                return item.product.id === product.id;
            })
            
            //returning new cart item with updated totalPrice and product object
            return {
                quantity: cartItem.quantity,
                product: product,
                totalPrice: +(cartItem.quantity * product.price).toFixed(2)
            }
        });

        //setting items to new array with updated products and prices
        this.items = items;

        //update totals
        this.updateCartTotals();
    }
}

module.exports = Cart;