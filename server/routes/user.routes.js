const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const Router = require("express").Router();

Router.post(
  "/addPersonalInfo",
  authController.verifyToken,
  userController.addPersonalInfo
);
Router.post(
  "/addAddress",
  authController.verifyToken,
  userController.addAddress
);
Router.post(
  "/changePassword",
  authController.verifyToken,
  userController.changePassword
);

module.exports = Router;
