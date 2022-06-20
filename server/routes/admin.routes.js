const adminController = require('../controller/admin.controller');
const authController = require("../controller/auth.controller");
const Router = require('express').Router();


Router.post('/addAdmin',authController.verifyToken,adminController.addAdmin)
Router.post('/addUser',authController.verifyToken,adminController.addEmployee)
Router.get('/getUsers',authController.verifyToken,adminController.getEmploees)
Router.get('/getRecentUsers',authController.verifyToken,adminController.getRecentEmployees)
Router.get('/getUserById/:id',authController.verifyToken,adminController.getEmployeeById)
Router.put('/addAdminImg',authController.verifyToken,adminController.addImg)
Router.get('/getAdminImg/:id',authController.verifyToken,adminController.getImg)

module.exports = Router