const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

const Router = require("express").Router();

Router.post(
  "/addPersonalInfo",
  authController.verifyToken,
  userController.addPersonalInfo
);
Router.get(
  "/getPersonalInfoData/:id",
  authController.verifyToken,
  userController.getPersonalInfoData
);
Router.put(
  "/updatePersonalInfo",
  authController.verifyToken,
  userController.updatePersonalInfo
);
Router.post(
  "/addAddress",
  authController.verifyToken,
  userController.addAddress
);
Router.put(
  "/updateAddress",
  authController.verifyToken,
  userController.updateAddAddress
);
Router.post(
  "/changePassword",
  authController.verifyToken,
  userController.changePassword
);
Router.post(
  "/addEmployment",
  authController.verifyToken,
  userController.addEmployment
);

Router.get(
  "/getEmployment/:id",
  authController.verifyToken,
  userController.getEmployemnt
);

Router.delete(
  "/deleteEmployment/:id",
  authController.verifyToken,
  userController.deleteEmployemnt
);

Router.put(
  "/updateEmployment/:id",
  authController.verifyToken,
  userController.updateEmployemnt
);

// Education routes
Router.post(
  "/addEducation",
  authController.verifyToken,
  userController.addEducation
);

Router.get(
  "/getEducation/:id",
  authController.verifyToken,
  userController.getEducation
);

Router.delete(
  "/deleteEducation/:id",
  authController.verifyToken,
  userController.deleteEducation
);

Router.put(
  "/updateEducation/:id",
  authController.verifyToken,
  userController.updateEducation
);
//  OTHER DETAILS
Router.post(
  "/addDetails",
  authController.verifyToken,
  userController.addOtherDetailsAndBankDetails
);
Router.get(
  "/getDetails/:id",
  authController.verifyToken,
  userController.getOtherDetailAndBankDetails
);
Router.put(
  "/updateDetails/:id",
  authController.verifyToken,
  userController.updateOtherDetailAndBankDetails
);
//declaration
Router.post(
  "/addDeclaration",
  authController.verifyToken,
  userController.addDeclaration
);
Router.get(
  "/getDeclaration/:id",
  authController.verifyToken,
  userController.getDeclaration
);

Router.put(
  "/updateDeclaration/:id",
  authController.verifyToken,
  userController.updateDeclaration
);
//forgotpasswordmail
Router.post(
  "/forgotPasswordMailed",
  userController.forgotpassword
);
//checkAndChange Pass
Router.post(
  "/checkPass",
  userController.checkPassword
);
Router.put(
  "/addImg",
  authController.verifyToken,
  userController.addImg
);
Router.get(
  "/getImg/:id",
  authController.verifyToken,
  userController.getImg
);
Router.get(
  "/getOfferLetter/:id",
  authController.verifyToken,
  userController.getOfferLetter
);
Router.get(
  "/getStatus/:id",
  authController.verifyToken,
  userController.getStatus
);
module.exports = Router;
