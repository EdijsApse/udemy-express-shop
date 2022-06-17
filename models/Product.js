const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.price = +productData.price;
        this.summary = productData.summary;
        this.description = productData.description;
        this.image = productData.image; // Name of image file
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    async save() {
        const productData = {
            title: this.title,
            price: this.price,
            summary: this.summary,
            description: this.description,
            image: this.image
        };

        await db.getDb().collection('products').insertOne(productData);
    }
}

module.exports = Product;