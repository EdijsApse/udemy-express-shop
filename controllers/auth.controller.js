const User = require("../models/User");

function getSignup(req, res) {
    res.render('customer/auth/signup');
}

async function signup(req, res) {
    const user = new User(req.body.email, req.body.password, req.body.fullname, req.body.street, req.body.postal, req.body.city);

    await user.signup();

    res.redirect('/login');
}

function getLogin(req, res) {
    res.render('customer/auth/login')
}

function login(req, res) {

}

function logout(req, res) {

}

module.exports = {
    getSignup: getSignup,
    signup: signup,
    getLogin: getLogin,
    login: login,
    logout: logout
}