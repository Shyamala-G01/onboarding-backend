const db = require("../model");
const personalInfo = db.personalInfo;
const address = db.address;

// contoller for adding admin
const addPersonalInfo = async (req, res) => {
  // const personalData = await personalInfo.create(info);
  console.log(req.body);
  let personData = {
    fk_person_users_id: req.body.fk_person_users_id,
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
  };
  const userData = await personalInfo.create(personData);
  if (userData) {
    res.status(200).send({ message: "Successful" });
  }else{
    res.status(400).send({ message: "Unsuccessful" }); 
  }
};

const getAdmin = async (req, res) => {
  let email = req.body.email;
  let users = await admin.findOne({ where: { email: email } });
  res.send(users);
};

module.exports = {
    addPersonalInfo
}