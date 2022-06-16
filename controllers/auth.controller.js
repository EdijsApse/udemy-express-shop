const User = require("../models/User");

const authUtil = require('../util/authentication');

const validation = require('../util/validation');

const sessionFlash = require('../util/session-flash');

function getSignup(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: '',
            'confirm-email': '',
            password: '',
            fullname: '',
            street: '',
            postal: '',
            city: ''
        }
    }

    res.render('customer/auth/signup', { sessionData });
}

async function signup(req, res, next) {
    const enteredData = {
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city
    };

    if (!validation.userDetailsAreValid(enteredData.email, enteredData.password, enteredData.fullname, enteredData.street, enteredData.postal, enteredData.city) || !validation.emailIsConfirmed(enteredData.email, req.body['confirm-email'])) {
        
        sessionFlash.flashDataToSession(req, {
            errorMessage: 'Please check your input !',
            ...enteredData,
            'confirm-email': req.body['confirm-email']
        }, () => {
            res.redirect('/signup')
        })

        return;
    }

    const user = new User(enteredData.email, enteredData.password, enteredData.fullname, enteredData.street, enteredData.postal, enteredData.city);

    try {
        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            
            sessionFlash.flashDataToSession(req, {
                errorMessage: 'User with this email already exists !',
                ...enteredData,
                'confirm-email': req.body['confirm-email']
            }, () => {
                res.redirect('/signup')
            })

            return;
        }

        await user.signup();
    } catch(error) {
        return next(error);
    }

    res.redirect('/login');
}

function getLogin(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: '',
            password: ''
        }
    }

    res.render('customer/auth/login', { sessionData })
}

async function login(req, res, next) {
    const user = new User(req.body.email, req.body.password);
    const existingUser = await user.getUserWithSameEmail();
    let passwordMatched;
    const sessionErrorData = {
        errorMessage: 'Incorret email or password !',
        ...{email: req.body.email, password: req.body.password}
    };

    if (!existingUser) {
        sessionFlash.flashDataToSession(req, sessionErrorData, () => {
            res.redirect('/login')
        });

        return;
    }

    try {
        passwordMatched = await user.passwordMatched(existingUser.password);    
    } catch(error) {
        return next(error);
    }

    if (!passwordMatched) {
        sessionFlash.flashDataToSession(req, sessionErrorData, () => {
            res.redirect('/login')
        });

        return;
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