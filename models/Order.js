const { ObjectId } = require("mongodb");
const database = require("../data/database");

class Order {
    constructor(orderData) {
        this.user = orderData.user;
        this.items = orderData.items;
        this.totalPrice = orderData.totalPrice;
        this.status = orderData.status ?? 'pending';
        this.date = orderData.date ?? new Date();
        this.formatedDate = this.date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        if (orderData._id) {
            this.id = orderData._id.toString();
        }
    }

    save() {
        if (this.id) {
            return database.getDb().collection('orders').updateOne(
                {
                    _id: new ObjectId(this.id)
                },
                { 
                    $set: {
                        status: this.status
                    }
                }
            );
        } else {
            return database.getDb().collection('orders').insertOne({
                user: this.user,
                items: this.items,
                totalPrice: this.totalPrice,
                status: this.status,
                date: this.date
            });
        }
    }

    static async findById(orderId) {
        let id;

        try {
            id = new ObjectId(orderId);
        } catch(err) {
            const error = new Error('Order not found!');
            error.code = 404;
            throw error;
        }

        const order = await database.getDb().collection('orders').findOne({_id: id});

        if (!order) {
            const error = new Error('Order not found!');
            error.code = 404;
            throw error;
        }

        return new Order(order);
    }
    
    static async getOrdersByUserId(user_id) {
        let userId;

        try {
            userId = new ObjectId(user_id);
        } catch(err) {
            const error = new Error('User not found!');
            error.code = 404;
            throw error;
        }

        const orders = await database.getDb().collection('orders').find({ 'user._id': new ObjectId(user_id) }).sort({_id: -1}).toArray();
        return orders.map((order) => new Order(order));
    }

    static async findAll() {
        const orders = await database.getDb().collection('orders').find().sort({_id: -1}).toArray();
        return orders.map((order) => new Order(order));
    }
}

module.exports = Order;