require("sequelize");
const db = require("../model");
const user = db.user;
const admin = db.admin;
//encrypting and comparing
const { genSaltSync, hashSync } = require("bcrypt");

//mailing
const mail = require("../config/mail.config");
const mailOptions = mail.mailOptions;
const transporter = mail.transporter;


//import file handler to create folder
const folderFunctions=require("../controller/fileHandler")
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
    let password = req.body.name.replaceAll(" ", "");
    let pass = "Welcome1" + password + "@!";
    info.password = hashSync(pass, salt);
    const adminData = await admin.create(info);
    if (adminData) {
      // sending mail after registration
      //to send mail on adding user
      mailOptions.to = `${info.email}`;
      (mailOptions.subject = "ADMIN PORTAL REGISTRATION SUCCESSFULL"),
        (mailOptions.text = `username: ${info.email}
                          password:${pass}`);
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

// contoller for adding employee
const addEmployee = async (req, res) => {
  folderFunctions.createFolder(req.body.id)
  const salt = genSaltSync(10);

  // already exit or not
  const userMail = await user.findOne({ where: { email: req.body.email } });

  if (userMail) {
    res.send({ message: "user already exists" });
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
    let password = req.body.name.replaceAll(" ", "");
    let pass = password+ "@!"+Math.floor(Math.random() * 10);
    info.password = hashSync(pass, salt);
    const userData = await user.create(info);
    if (userData) {
      // sending mail after registration

      //to send mail on adding user
      mailOptions.to = `${info.email}`;
      (mailOptions.subject = "WELCOME TO DIGGIBYTE FAMILY"),
        (mailOptions.text = `username: ${info.email}
      
      password:${pass}`);

      transporter.sendMail(mailOptions, function (err, info) {
        console.log("transporter");
        if (err) {
          console.log("err " + err);
        } else {
          console.log("mail sent" + info.response);
        }
      });
      folderFunctions.uploadfile(req.files,req.body.id)
      res.status(200).send({ message: "Registered Successfully" });
    } else {
      res.status(404).send({ message: "Cannot Register" });
    }
  }
};

// const getAdmin = async (req, res) => {
//   let email = req.body.email;
//   let users = await admin.findOne({ where: { email: email } });
//   res.send(users);
// };

module.exports = {
  addAdmin,
  addEmployee,
  // getAdmin
};
