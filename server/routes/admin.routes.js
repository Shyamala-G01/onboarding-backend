const adminController = require('../controller/admin.controller');
const authController = require("../controller/auth.controller");
const Router = require('express').Router();


Router.post('/addAdmin',authController.verifyToken,adminController.addAdmin)
Router.post('/addUser',authController.verifyToken,adminController.addEmployee)

module.exports = Router