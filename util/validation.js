function notEmpty(value) {
    return value && value.trim() !== '';
}

function userCredentialsAreValid(email, password) {
    return email && email.includes('@') && password && password.trim().length > 5
}

function userDetailsAreValid(email, password, name, street, postal, city) {
    return userCredentialsAreValid(email, password) && notEmpty(name) && notEmpty(street) && notEmpty(postal) && notEmpty(city);
}

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail;
}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed
}