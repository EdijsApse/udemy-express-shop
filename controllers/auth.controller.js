function getSignup(req, res) {
    res.send('Signup view');
}

function signup(req, res) {

}

function getLogin(req, res) {
    res.send('Login view');
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