const express = require('express');
const path = require('path');
const app = express();

const database = require('./data/database');

const authRoutes = require('./routes/auth.routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('App Started');
})

app.use(authRoutes);

database.connectToDatabase()
.then(() => {
    app.listen(3000);
})
.catch((err) => {
    console.log('Failed to connect to DB!');
    console.log(err);
})