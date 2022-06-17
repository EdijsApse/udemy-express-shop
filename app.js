const express = require('express');
const path = require('path');
const csrf = require('csurf');
const expressSession = require('express-session');
const app = express();

const database = require('./data/database');

const csrfLocalMiddleware = require('./middlewares/csrfToken');
const errorHandler = require('./middlewares/errorHandler');
const checkAuthMiddleware = require('./middlewares/checkAuth');

const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');

const createSessionConfig = require('./config/session');

const sessionConfig = createSessionConfig();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets/images', express.static('product-data/images'))
app.use(express.urlencoded({ extended: false }));

app.use(expressSession(sessionConfig));

app.use(csrf());
app.use(csrfLocalMiddleware);

app.use(checkAuthMiddleware);

app.use(baseRoutes);
app.use(productsRoutes);
app.use(authRoutes);
app.use('/admin', adminRoutes);

app.use('*', (req, res) => {
    res.render('shared/404');
});

app.use(errorHandler);

database.connectToDatabase()
.then(() => {
    app.listen(3000);
})
.catch((err) => {
    console.log('Failed to connect to DB!');
    console.log(err);
})