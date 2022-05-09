const db = require("../model");
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

module.exports = { addAdmin }