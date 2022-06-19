const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');

const protectRoutesMiddlewares = require('../middlewares/protectRoutes');

router.get('/login', protectRoutesMiddlewares.passIfGuest, controller.getLogin);
router.post('/login', protectRoutesMiddlewares.passIfGuest, controller.login);

router.get('/signup', protectRoutesMiddlewares.passIfGuest, controller.getSignup);
router.post('/signup', protectRoutesMiddlewares.passIfGuest, controller.signup);

router.post('/logout', protectRoutesMiddlewares.passIfUser, controller.logout);

module.exports = router;