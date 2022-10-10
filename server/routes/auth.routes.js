const authController = require('../controller/auth.controller');
const Router = require('express').Router();

Router.post('/login',authController.getData);


module.exports = Router;