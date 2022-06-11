const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017'); //Connecting to server
    database = client.db('online-shop'); //Connecting to database
}

function getDb() {
    if (!database) {
        throw new Error('Database connection not established !');
    }
    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}