const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');
const database = require('../data/database');

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        }
    }

    async signup() {
        const hashedPwd = await bcrypt.hash(this.password, 12);
        
        await database.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPwd,
            name: this.name,
            address: this.address
        });
    }

    getUserWithSameEmail() {
        return database.getDb().collection('users').findOne({ email: this.email });
    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        
        return existingUser ? true : false;
    }

    passwordMatched(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword)
    }

    static async findDocumentById(id) {
        let userId;
        try {
            userId = new ObjectId(id);
        } catch(err) {
            const error = new Error('User not found!');
            error.code = 404;
            throw error;
        }
        
        const user = await database.getDb().collection('users').findOne({ _id: new ObjectId(id) }, {projection: { password: 0 }}); // Return all fields except password

        if (!user) {
            const error = new Error('User not found!');
            error.code = 404;
            throw error;
        }

        return user;
    }
}

module.exports = User;