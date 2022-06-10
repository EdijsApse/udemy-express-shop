const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');

router.get('/login', controller.getLogin);
router.post('/login', controller.login);

router.get('/signup', controller.getSignup);
router.post('/signup', controller.signup);

router.post('/logout', controller.logout);

module.exports = router;