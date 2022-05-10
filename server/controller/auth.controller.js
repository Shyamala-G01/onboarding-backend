const db = require("../model/index");
const config = require("../config/auth.config.js");
const Admin = db.admin;
// const user = db.user;
const jwt = require("jsonwebtoken");
const { compareSync } = require("bcrypt");

const getData = async (req, res) => {
  const email = req.body.email;
  if (req.body.role == "admin") {
    const data = await Admin.findOne({ where: { email: email } });
    if (data) {
      let pass = req.body.password;
      if (compareSync(pass, data.password)) {
        let token = jwt.sign({ id: data.id }, config.secret, {
          expiresIn: 86400,
        });
        console.log(token);
        res.status(200).send({
          id: data.id,
          role: data.role,
          name: data.name,
          email: data.email,
          accessToken: token,
        });
      } else {
        res.json({
          status: 400,
          message: "invalid password",
        });
      }
    } else {
      return res.json({
        status: 400,
        message: "user not found",
      });
    }
  }
  if (req.body.role == "user") {
    const data = await user.findOne({ where: { email: email } });
    if (data) {
      let pass = req.body.password;
      if (compareSync(pass, data.password)) {
        let token = jwt.sign({ id: data.id }, config.secret, {
          expiresIn: 86400,
        });
        console.log(token);
        res.status(200).send({
          id: data.id,
          role: data.role,
          name: data.name,
          email: data.email,
          accessToken: token,
        });
      } else {
        res.json({
          status: 400,
          message: "invalid password",
        });
      }
    } else {
      res.json({
        status: 400,
        message: "user not found",
      });
    }
  }
};
module.exports = { getData };
