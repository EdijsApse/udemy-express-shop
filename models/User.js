const bcrypt = require('bcryptjs');
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

    passwordMatched(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword)
    }
}

module.exports = User;