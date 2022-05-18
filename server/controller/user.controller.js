const { sequelize } = require("../model");
const db = require("../model");
const { genSaltSync, hashSync } = require("bcrypt");
const personalInfo = db.personalInfo;
const address = db.address;
const employmentDetails = db.employmentDetails;
const user = db.user;
const educationalInfo = db.educationalInfo;
const otherDetails=db.proofCertificates
const declaration =db.declaration
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
  const data = await address.create(info);
  if (data) {
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

// employment
const addEmployment = async (req, res) => {
  console.log(req.body);
  const info = {
    org_name: req.body.organizationName,
    joining_date: req.body.joiningDate,
    relieving_date: req.body.relievingDate,
    relieving_letter: req.body.relievingLetter,
    offer_letter: req.body.offerLetter,
    pay_slip1: req.body.payslip1,
    pay_slip2: req.body.payslip2,
    pay_slip3: req.body.payslip3,
    hr_name: req.body.hr_name,
    notice_date: req.body.noticePeriodEndDate,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_employment_users_id: req.body.fk_employment_users_id,
  };
  const userData = await employmentDetails.create(info);
  if (userData) {
    res.status(200).send({ message: "Successful" });
  } else {
    res.status(400).send({ message: "Unsuccessful" });
  }
};

const getEmployemnt = async (req, res) => {
  let id = req.params.id;
  let employmentData = await employmentDetails.findAll({
    where: { fk_employment_users_id: id },
  });
  console.log(employmentData);
  res.send(employmentData);
};

const updateEmployemnt = async (req, res) => {
  let id = req.params.id;
  const info = {
    org_name: req.body.organizationName,
    joining_date: req.body.joiningDate,
    relieving_date: req.body.relievingDate,
    relieving_letter: req.body.relievingLetter,
    offer_letter: req.body.offerLetter,
    pay_slip1: req.body.payslip1,
    pay_slip2: req.body.payslip2,
    pay_slip3: req.body.payslip3,
    hr_name: req.body.hr_name,
    notice_date: req.body.noticePeriodEndDate,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_employment_users_id: req.body.fk_employment_users_id,
  };
  let employmentData = await employmentDetails.update(info, {
    where: { id: id },
  });
  console.log("updated");
  res.send({ message: "updated" });
};

const deleteEmployemnt = async (req, res) => {
  let id = Number(req.params.id);
  let employmentData = await employmentDetails.destroy({
    where: { id: id },
  });
  // console.log(employmentData);
  res.send({ message: "deleted" });
};

// Get personal information
const getPersonalInfoData = async (req, res) => {
  let id = req.params.id;
  const data = await user.findAll({
    include: [
      {
        model: personalInfo,
        as: "personal_info",
      },
      {
        model: address,
        as: "address",
      },
    ],
    where: { id:id },
  });
  console.log(data);
  res.send(data);
};

//adding educational details
const addEducation = async (req, res) => {
  console.log(req.body);
  const info = {
    type: req.body.education,
    name: req.body.School,
    board: req.body.board,
    course: req.body.course,
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    marks: req.body.percentage,
    marks_card: req.body.marksheet,
    transfer_certificate: req.body.transferCertificate,
    provisional_marks_card: req.body.provisional_marks_card,
    convocation_certificate: req.body.convocation_certificate,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_education_users_id: req.body.fk_education_users_id,
  };
  const educationData = await educationalInfo.create(info);
  if (educationData) {
    res.status(200).send({ message: "Successful" });
  } else {
    res.status(400).send({ message: "Unsuccessful" });
  }
};

//get education based on id
const getEducation = async (req, res) => {
  let id = req.params.id;
  let educationData = await educationalInfo.findAll({
    where: { fk_education_users_id: id },
  });
  console.log(educationData);
  res.send(educationData);
};

//update perticular/specific education i.e by id
const updateEducation = async (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  const info = {
    type: req.body.education,
    name: req.body.School,
    board: req.body.board,
    course: req.body.course,
    specialization: req.body.specialization,
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    marks: req.body.percentage,
    marks_card: req.body.marksheet,
    transfer_certificate: req.body.transferCertificate,
    provisional_marks_card: req.body.provisionalCertificate,
    convocation_certificate: req.body.convocationCertificate,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_education_users_id: req.body.fk_education_users_id,
  };
  let educationData = await educationalInfo.update(info, {
    where: { id: id },
  });
  console.log(educationData);
  res.send({ message: "updated" });
};

//delete specific education details
const deleteEducation = async (req, res) => {
  let id = Number(req.params.id);
  let educationData = await educationalInfo.destroy({
    where: { id: id },
  });

  res.send({ message: "deleted" });
};
// adding other details
const addOtherDetails = async (req, res) => {
  console.log(req.body);
  const info = {
    aadhar_card_number: req.body.aadhar_card_number,
    aadhar: req.body.aadharCard,
    pan_card_number: req.body.pan_card_number,
    pan_card: req.body.passport_number,
    passport_number: req.body.passport_expire,
    passport_expire_date: req.body.panCard,
    passport: req.body.passportDetails,
    covid_certificate: req.body.covidCertificate,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_proof_users_id: req.body.fk_proof_users_id,
  };
  const proofData = await otherDetails.create(info);
  if (proofData) {
    res.status(200).send({ message: "Successful" });
  } else {
    res.status(400).send({ message: "Unsuccessful" });
  }
}
//get OtherDetail based on id
const getOtherDetail = async (req, res) => {
  let id = req.params.id;
  let proofData = await otherDetails.findOne({
    where: { fk_proof_users_id: id },
  });
  console.log(proofData);
  res.send(proofData);
};
//update perticular/specific OtherDetail i.e by id
const updateOtherDetail = async (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  const info = {
    aadhar_card_number: req.body.aadhar_card_number,
    aadhar: req.body.aadharCard,
    pan_card_number: req.body.pan_card_number,
    pan_card: req.body.passport_number,
    passport_number: req.body.passport_expire,
    passport_expire_date: req.body.panCard,
    passport: req.body.passportDetails,
    covid_certificate: req.body.covidCertificate,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_proof_users_id: req.body.fk_proof_users_id,
  };
  let proofData = await otherDetails.update(info, {
    where: { fk_proof_users_id: id },
  });
  console.log(proofData);
  res.send({ message: "updated" });
};
//adding declaration
const addDeclaration = async (req, res) => {
  console.log(req.body);
  const info = {
    joining_date: req.body.joiningDate,
    place: req.body.place,
    date: req.body.date,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_declaration_users_id: req.body.fk_declaration_users_id,
  };
  const declarationData = await declaration.create(info);
  if (declarationData) {
    res.status(200).send({ message: "Successful" });
  } else {
    res.status(400).send({ message: "Unsuccessful" });
  }
}
//get OtherDetail based on id
const getDeclaration = async (req, res) => {
  let id = req.params.id;
  let declarationData = await declaration.findOne({
    where: { fk_declaration_users_id: id },
  });
  console.log(declarationData);
  res.send(declarationData);
};
//update perticular/specific OtherDetail i.e by id
const updateDeclaration = async (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  const info = {
    joining_date: req.body.joiningDate,
    place: req.body.place,
    date: req.body.date,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_declaration_users_id: req.body.fk_declaration_users_id,
  };
  let declarationData = await declaration.update(info, {
    where: { fk_declaration_users_id: id },
  });
  console.log(declarationData);
  res.send({ message: "updated" });
};
module.exports = {
  addPersonalInfo,
  addAddress,
  changePassword,
  addEmployment,
  getEmployemnt,
  updateEmployemnt,
  deleteEmployemnt,
  addEducation,
  getEducation,
  updateEducation,
  deleteEducation,
  getPersonalInfoData,
  addOtherDetails,
  getOtherDetail,
  updateOtherDetail,
  addDeclaration,
  getDeclaration,
  updateDeclaration
};
