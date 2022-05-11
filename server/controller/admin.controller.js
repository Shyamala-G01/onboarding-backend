const db = require("../model");
const user = db.user;
const { genSaltSync, hashSync } = require("bcrypt");
require("sequelize");

const admin = db.admin;

// contoller for adding admin
const addAdmin = async (req, res) => {
  const salt = genSaltSync(10);
  let info = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    designation: req.body.designation,
    created_at: "2022-05-09",
    created_by_admin: "Admin",
  };
  let pass = req.body.name + "@123";
  info.password = hashSync(pass, salt);
  const adminData = await admin.create(info);
  res.status(200).send(adminData);
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
  const userMail = await user.findOne({ email: req.body.email });
  if(userMail){
    res.send({ message : "User already exist!"})
  }else{
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
    };
    let pass = req.body.name + "@123";
    info.password = hashSync(pass, salt);
    const userData = await user.create(info);
    if (userData) {
      res.status(200).send({ message: "Registered Successfully" });
    } else {
      res.status(404).send({ message: "Can't Register" });
    }
  }
 

  // sending mail after registration
  // if(adminData){

  // }
};

module.exports = { addAdmin, getAdmin, addEmployee };
