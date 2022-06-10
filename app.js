const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('App Started');
})

app.listen(3000)