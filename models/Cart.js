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
            totalPrice: product.price
        }

        const item = this.findProductById(product.id);

        if (item) {
            cartItem.quantity = item.quantity + 1;
            cartItem.totalPrice = item.totalPrice + product.price;
            item = cartItem;

            this.totalQuantity++;
            this.totalPrice += product.price;
        } else {
            this.items.push(cartItem);
            
            this.totalQuantity++;
            this.totalPrice += product.price;
        }
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
        item.totalPrice = quantity * item.product.price;

        this.updateCartTotals();
    }

    updateCartTotals() {
        this.totalPrice = this.items.reduce((currentValue, nextItem) => {
            return currentValue + nextItem.totalPrice;
        }, 0);

        this.totalQuantity = this.items.reduce((currentValue, nextItem) => {
            return currentValue + nextItem.quantity;
        }, 0);
    }

    findProductById(product_id) {
        return this.items.find((item) => {
            return item.product.id == product_id;
        });
    }
}

module.exports = Cart;