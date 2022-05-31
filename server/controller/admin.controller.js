const db = require("../model");
const user = db.user;
const { genSaltSync, hashSync } = require("bcrypt");
require("sequelize");
const mail = require("../config/mail.config");

const admin = db.admin;

//mailing
const mailOptions = mail.mailOptions;
const transporter = mail.transporter;

// contoller for adding admin
const addAdmin = async (req, res) => {
  const salt = genSaltSync(10);

  // already exit or not
  const adminMail = await admin.findOne({ where: { email: req.body.email } });
  if (adminMail) {
    res.send({ message: "Admin Exist" });
  } else {
    let info = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      designation: req.body.designation,
      created_at: req.body.created_at,
      created_by_admin: req.body.created_by_admin,
    };
    let password = req.body.name.replaceAll(" ","");
    let pass="Welcome1"+password+"@!"
    info.password = hashSync(pass, salt);
    const adminData = await admin.create(info);
    if (adminData) {
      // sending mail after registration

      //to send mail on adding user
      mailOptions.to = `${info.email}`;
      mailOptions.subject="ADMIN PORTAL REGISTRATION SUCCESSFULL",
      mailOptions.text = `username: ${info.email}
  
    password:${pass}`;
      transporter.sendMail(mailOptions, function (err, info) {
        console.log("transporter");
        if (err) {
          console.log("err " + err);
        } else {
          console.log("mail sent" + info.response);
        }
      });

      res.status(200).send({ message: "Registered Successfully" });
    } else {
      res.status(404).send({ message: "Cannot Register" });
    }
  }
};

const getAdmin = async (req, res) => {
  let email = req.body.email;
  let users = await admin.findOne({ where: { email: email } });
  res.send(users);
};

// contoller for adding employee
const addEmployee = async (req, res) => {
  const salt = genSaltSync(10);

  // already exit or not
  const userMail = await user.findOne({ where: { email: req.body.email } });

  if (userMail) {
    res.send(userMail);
  } else {
    let info = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      designation: req.body.designation,
      created_at: req.body.created_at,
      created_by: req.body.created_by,
      updated_at: req.body.updated_at,
      updated_by: req.body.updated_by,
      status: req.body.status,
    };
    let password = req.body.name.replaceAll(" ","");
    let pass="Welcome1"+password+"@!"
    info.password = hashSync(pass, salt);
    const userData = await user.create(info);
    if (userData) {
      // sending mail after registration

      //to send mail on adding user
      mailOptions.to = `${info.email}`;
      mailOptions.subject="WELCOME TO DIGGIBYTE FAMILY",
      mailOptions.text = `username: ${info.email}

                          password:${pass}`;

      transporter.sendMail(mailOptions, function (err, info) {
        console.log("transporter");
        if (err) {
          console.log("err " + err);
        } else {
          console.log("mail sent" + info.response);
        }
      });

      res.status(200).send({ message: "Registered Successfully" });
    } else {
      res.status(404).send({ message: "Cannot Register" });
    }
  }
};

module.exports = { addAdmin, getAdmin, addEmployee };
