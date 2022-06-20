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
        const index = this.items.findIndex((item) => {
            return item.product.id == product.id;
        });

        if (index !== -1) {
            let existingProduct = this.items[index];

            cartItem.quantity = existingProduct.quantity + 1;
            cartItem.totalPrice = existingProduct.price + product.price;
            this.items[index] = cartItem;

            this.totalQuantity++;
            this.totalPrice += product.price;
        } else {
            this.items.push(cartItem);
            
            this.totalQuantity++;
            this.totalPrice += product.price;
        }
    }

    getTotalItems() {
        return this.items.reduce((count, cartItem) => {
            return count + cartItem.quantity;
        }, 0);
    }

    getTotalPrice() {
        return this.items.reduce((count, cartItem) => {
            return count + cartItem.totalPrice;
        }, 0);
    }
}

module.exports = Cart;