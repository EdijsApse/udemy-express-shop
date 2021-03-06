// req.session.save accepts callback, which will execute, when data will be saved in collection

function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action)
}

function destroyUserSession (req, action) {
    req.session.uid = null;
    req.session.isAdmin = false;
    req.session.save(action)
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserSession: destroyUserSession
};