function errorHandler(error, req, res, next) {
    if (error.code === 406) {
        return res.status(406).render('shared/406');
    }

    if (error.code === 404) {
        return res.status(404).render('shared/404');
    }

    if (error.code === 403) {
        return res.status(403).render('shared/403');
    }

    if (error.code === 401) {
        return res.status(401).render('shared/401');
    }

    console.log(error)

    res.status(500).render('shared/500');
}

module.exports = errorHandler;