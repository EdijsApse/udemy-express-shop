const express = require('express');
const app = express();

const authRoutes = require('./routes/auth.routes');

app.get('/', (req, res) => {
    res.send('App Started');
})

app.use(authRoutes);

app.listen(3000);