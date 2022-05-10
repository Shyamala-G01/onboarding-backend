const adminController = require('../controller/admin.controller');
const Router = require('express').Router();


Router.post('/',adminController.addAdmin)
Router.post('/getAdmin',adminController.getAdmin)

module.exports = Router