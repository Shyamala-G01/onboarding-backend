const adminController = require('../controller/admin.controller');
const Router = require('express').Router();


Router.post('/',adminController.addAdmin)


module.exports = Router