const { sequelize } = require("../model");
const db = require("../model");
const { genSaltSync, hashSync } = require("bcrypt");
const personalInfo = db.personalInfo;
const address = db.address;
const user = db.user;

const addPersonalInfo = async (req, res) => {
  console.log(req.body);
  const userData = await personalInfo.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      gender: req.body.gender,
      mobile_number: req.body.mobile_number,
      alternate_number: req.body.alternate_number,
      personal_email: req.body.personal_email,
      photo: req.body.photo,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      updated_by: req.body.updated_by,
      fk_person_users_id: req.body.fk_person_users_id,
    },
    {
      fields: [
        "first_name",
        "last_name",
        "dob",
        "gender",
        "mobile_number",
        "alternate_number",
        "personal_email",
        "photo",
        "created_at",
        "updated_at",
        "updated_by",
        "fk_person_users_id",
      ],
    }
  );
  if (userData) {
    res.status(200).send({ message: "Successful" });
  } else {
    res.status(400).send({ message: "Unsuccessful" });
  }
};

// Address
const addAddress = async (req, res) => {
  console.log(req.body);
  const info = {
    type: req.body.type,
    house_no: req.body.house_no,
    street: req.body.street,
    locality: req.body.locality,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    country: req.body.country,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_address_users_id: req.body.fk_address_users_id,
  };
  const userData = await address.create(info);
  if (userData) {
    res.status(200).send({ message: "Successful" });
  } else {
    res.status(400).send({ message: "Unsuccessful" });
  }
};




const changePassword = async (req, res) => {
  const salt = genSaltSync(10);
  const emailData = req.body.email;
  console.log(emailData);
  let data = await user.findOne({ where: { email: emailData } });
  console.log(data);
  if (data) {
    let pass = hashSync(req.body.password, salt);
    console.log(req.body.status);
    const usercredential = await user.update(
      { password: pass, password_status: req.body.status },

      { where: { email: emailData } }
    );
    if (usercredential) {
      res.status(200).send({ message: "Password Updated successfully" });
    } else {
      res.status(400).send({ message: "Password cannot be updated" });
    }
  } else {
    res.status(400).send({ message: "Email does not exit" });
  }
};


// Address
const addEmployment = async (req, res) => {
  console.log(req.body);
  const info = {
    type: req.body.type,
    house_no: req.body.house_no,
    street: req.body.street,
    locality: req.body.locality,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    country: req.body.country,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_address_users_id: req.body.fk_address_users_id,
  };
  // const userData = await address.create(info);
  // if (userData) {
  //   res.status(200).send({ message: "Successful" });
  // } else {
  //   res.status(400).send({ message: "Unsuccessful" });
  // }
};


module.exports = {
  addPersonalInfo,
  addAddress,
  changePassword,
  addEmployment
};
