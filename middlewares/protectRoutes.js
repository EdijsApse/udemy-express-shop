function passIfAdmin(req, res, next) {
    const isAdmin = res.locals.isAdmin;
    if (!isAdmin) {
        const error = new Error('Unauthorized!');
        error.code = 403;
        return next(error);
    }
    next();
}

function passIfGuest(req, res, next) {
    const isAuth = res.locals.isAuth;
    if (isAuth) {
        const error = new Error('Already loged in!');
        error.code = 406;
        return next(error);
    }
    next();
}

function passIfUser(req, res, next) {
    const isAuth = res.locals.isAuth;
    if (!isAuth) {
        const error = new Error('Unauthenticated');
        error.code = 401;
        return next(error);
    }
    next();
}

module.exports = {
    passIfGuest: passIfGuest,
    passIfAdmin: passIfAdmin,
    passIfUser: passIfUser
};