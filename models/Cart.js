class Cart {
    constructor(items = []) {
        this.items = items;
    }
    
    additem(product) {
        const cartItem = {
            quantity: 1,
            product: product,
            totalPrice: product.price
        }
        const index = this.items.findIndex((item) => {
            return item.product.id == product.id;
        });

        if (index !== -1) {
            cartItem.quantity = cartItem.quantity + 1;
            cartItem.totalPrice = cartItem.totalPrice + cart.price;
            this.items[index] = cartItem;
        } else {
            this.items.push(cartItem);
        }
    }
}

module.exports = Cart;