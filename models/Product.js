const { ObjectId } = require('mongodb');
const db = require('../data/database');
const fs = require('fs');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.price = +productData.price;
        this.summary = productData.summary;
        this.description = productData.description;
        this.image = productData.image; // Name of image file

        this.updateImageData();

        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    async save() {
        const productData = {
            title: this.title,
            price: this.price,
            summary: this.summary,
            description: this.description,
            image: this.image
        };

        if (!this.image) {
            delete productData.image;
        }

        if (this.id) {
            const productId = new ObjectId(this.id);
            await db.getDb().collection('products').updateOne({_id: productId}, {$set: productData});
        } else {
            await db.getDb().collection('products').insertOne(productData);
        }
    }

    getAdminUrl() {
        return `/admin${this.getUserUrl()}`;
    }

    getUserUrl() {
        return `/products/${this.id}`;
    }

    static async getById(id) {
        let productId;
        
        try {
            productId = new ObjectId(id);
        } catch(err) {
            const error = new Error('Product not found!');
            error.code = 404;
            throw error;
        }

        const product = await db.getDb().collection('products').findOne({_id: new ObjectId(id)});
        
        if (!product) {
            const error = new Error('Product not found!');
            error.code = 404;
            throw error;
        }

        return new Product(product);
    }

    async deleteProduct() {
        await db.getDb().collection('products').deleteOne({_id: new ObjectId(this.id)});

        fs.unlink(this.imagePath, (err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    replaceImage(imageName) {
        this.image = imageName;
        this.updateImageData();
    }

    updateImageData() {
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    static async findAll(query = {}) {
        const products = await db.getDb().collection('products').find(query).toArray();
        return products.map((productDocument) => new Product(productDocument));
    }
}

module.exports = Product;