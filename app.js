const express = require('express');
const path = require('path');
const app = express();

const authRoutes = require('./routes/auth.routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('App Started');
})

app.use(authRoutes);

app.listen(3000);