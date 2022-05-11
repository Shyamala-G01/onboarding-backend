const adminController = require('../controller/admin.controller');
const Router = require('express').Router();


Router.post('/addAdmin',adminController.addAdmin)
Router.post('/addUser', adminController.addEmployee)

module.exports = Router