const adminController = require('../controller/admin.controller');
const authController = require("../controller/auth.controller");
const Router = require('express').Router();



Router.post('/addAdmin',authController.verifyToken,adminController.addAdmin)
Router.post('/addUser',authController.verifyToken,adminController.addEmployee)
Router.get('/getUsers',authController.verifyToken,adminController.getEmploees)
Router.get('/getRecentUsers',authController.verifyToken,adminController.getRecentEmployees)
Router.get('/getUserById/:id',authController.verifyToken,adminController.getEmployeeById)
Router.get('/getEmploy/:id',authController.verifyToken,adminController.getEmploy)
Router.put('/addAdminImg',authController.verifyToken,adminController.addImg)
Router.get('/getAdminImg/:id',authController.verifyToken,adminController.getImg)
Router.delete('/deleteEmployee/:id',authController.verifyToken,adminController.deleteEmployee)
Router.get('/getCounts',authController.verifyToken,adminController.getTotals)
Router.get('/getPendingRecord',authController.verifyToken,adminController.getPendingRecord)
Router.put('/updateProof/:id',authController.verifyToken,adminController.putProofDetails)
Router.put('/updateBank/:id',authController.verifyToken,adminController.putBankDetails)
Router.post('/deleteFiles/:id',authController.verifyToken,adminController.deleteFile)
Router.get('/deletenotification',authController.verifyToken,adminController.deletenotification)
Router.post('/sendEmailsToPendngPrf',authController.verifyToken,adminController.sendEmailForPendingProfile);
Router.post('/sendEmailsForMissingDoc',authController.verifyToken,adminController.sendComments);
Router.post('/sendApprovedMail',authController.verifyToken,adminController.sendApprovedEmail);
Router.get('/getAdmins',authController.verifyToken,adminController.getAdmins);
Router.delete('/deleteAdmin/:id',authController.verifyToken,adminController.deleteAdmin);
Router.post('/getOneEmployee',authController.verifyToken,adminController.getOneEmployeeData);
Router.post('/getUserData',authController.verifyToken,adminController.getOneuserData);
module.exports = Router