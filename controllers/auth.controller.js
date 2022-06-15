const User = require("../models/User");

const authUtil = require('../util/authentication');

function getSignup(req, res) {
    res.render('customer/auth/signup');
}

async function signup(req, res, err) {
    const user = new User(req.body.email, req.body.password, req.body.fullname, req.body.street, req.body.postal, req.body.city);

    try {
        await user.signup();   
    } catch(error) {
        return next(error);
    }

    res.redirect('/login');
}

function getLogin(req, res) {
    res.render('customer/auth/login')
}

async function login(req, res, next) {
    const user = new User(req.body.email, req.body.password);
    const existingUser = await user.getUserWithSameEmail();
    let passwordMatched;

    if (!existingUser) {
        return res.redirect('/login');
    }

    try {
        passwordMatched = await user.passwordMatched(existingUser.password);    
    } catch(error) {
        return next(error);
    }

    if (!passwordMatched) {
        return res.redirect('/login');
    }

    authUtil.createUserSession(req, existingUser, () => {
        res.redirect('/');
    })
}

function logout(req, res) {
    authUtil.destroyUserSession(req, () => {
        res.redirect('/login');
    })
}

module.exports = {
    getSignup: getSignup,
    signup: signup,
    getLogin: getLogin,
    login: login,
    logout: logout
}