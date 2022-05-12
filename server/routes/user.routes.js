const userController = require("../controller/user.controller");
const Router = require("express").Router();

Router.post("/addPersonalInfo", userController.addPersonalInfo);
Router.post("/addAddress", userController.addAddress);


module.exports = Router;
