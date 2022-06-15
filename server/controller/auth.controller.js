const db = require("../model/index");
const config = require("../config/auth.config.js");
const Admin = db.admin;
const user = db.user;
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
        console.log(data);
        res.status(200).send({
          id: data.id,
          role: data.fk_admins_roles_role,
          name: data.name,
          email: data.email,
          designation: data.designation,
          accessToken: token,
        });
      } else {
        res.send({
          status: 400,
          message: "invalid password",
        });
      }
    } else {
      return res.send({
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
          role: data.fk_users_roles_role,
          name: data.name,
          email: data.email,
          designation: data.designation,
          pass: data.password_status,
          accessToken: token,
        });
      } else {
        res.send({
          status: 400,
          message: "invalid password",
        });
      }
    } else {
      res.send({
        status: 400,
        message: "user not found",
      });
    }
  }
};

// Verify the token
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
        error: err,
      });
    }
    next();
  });
};
module.exports = { getData, verifyToken };
