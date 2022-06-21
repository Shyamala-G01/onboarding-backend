const db = require("../model");
const { genSaltSync, hashSync } = require("bcrypt");
const { compareSync } = require("bcrypt");
const personalInfo = db.personalInfo;
const address = db.address;
const employmentDetails = db.employmentDetails;
const user = db.user;
const admin = db.admin;
const educationalInfo = db.educationalInfo;
const otherDetails = db.proofCertificates;
const declaration = db.declaration;
const bankdetails = db.bankDetails;
// mailing
const mail = require("../config/mail.config");
const mailOptions = mail.mailOptions;
const transporter = mail.transporter;

//import file handler to create folder
const folderFunctions = require("../controller/fileHandler");
//add data to personal info table
const addPersonalInfo = async (req, res) => {
  const data = await user.findOne({
    where: { id: req.body.fk_person_users_id },
  });

  const usercredential = await user.update(
    { status: data.status + 20 },

    { where: { id: req.body.fk_person_users_id } }
  );
  console.log("s");
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
      father_name: req.body.father_name,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      updated_by: req.body.updated_by,
      status: "completed",
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
        "father_name",
        "created_at",
        "updated_at",
        "updated_by",
        "status",
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
//update personal info table
const updatePersonalInfo = async (req, res) => {
  console.log(req.body);
  let info = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dob: req.body.dob,
    gender: req.body.gender,
    mobile_number: req.body.mobile_number,
    alternate_number: req.body.alternate_number,
    personal_email: req.body.personal_email,
    photo: req.files.photo.name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_person_users_id: req.body.fk_person_users_id,
  };
  const userData = await personalInfo.update(info, {
    where: { fk_person_users_id: req.body.fk_person_users_id },
  });

  if (userData) {
    folderFunctions.uploadfile(req.files, req.body.id);
    res.status(200).send(userData);
  } else {
    res.status(400).send({ message: "Unsuccessful" });
  }
};

// Address
const addAddress = async (req, res) => {
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
const updateAddAddress = async (req, res) => {
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
  };
  const data = await address.update(info, {
    where: {
      fk_address_users_id: req.body.fk_address_users_id,
      type: req.body.type,
    },
  });
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
  const data = await user.findOne({
    where: { id: req.body.fk_employment_users_id },
  });
  const empDtat = await employmentDetails.findOne({
    where: { fk_employment_users_id: req.body.fk_employment_users_id },
  });
  if (!empDtat) {
    const usercredential = await user.update(
      { status: data.status + 20 },

      { where: { id: req.body.fk_employment_users_id } }
    );
  }
  console.log(req.body);

  const info = {
    type: req.body.type,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    status: "completed",
    fk_employment_users_id: req.body.fk_employment_users_id,
  };
  if (req.body.type != "Fresher") {
    (info.org_name = req.body.organizationName),
      (info.joining_date = req.body.joiningDate),
      (info.relieving_date = req.body.relievingDate),
      (info.relieving_letter = req.files.relievingLetter.name),
      (info.hr_name = req.body.hr_name);
  }
  if (req.body.type == "Recent") {
    info.offer_letter = req.files.offerLetter.name;
    info.pay_slip1 = req.files.payslip1.name;
    info.pay_slip2 = req.files.payslip2.name;
    info.pay_slip3 = req.files.payslip3.name;
    info.notice_date = req.body.noticePeriodEndDate;
  }

  const userData = await employmentDetails.create(info);
  if (userData) {
    folderFunctions.uploadfile(req.files, req.body.fk_employment_users_id);
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
  let ids = req.params.id;
  const dat = await employmentDetails.findOne({ where: { id: ids } });
  const info = {
    type: req.body.type,
    org_name: req.body.organizationName,
    joining_date: req.body.joiningDate,
    relieving_date: req.body.relievingDate,

    hr_name: req.body.hr_name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_employment_users_id: req.body.fk_employment_users_id,
  };
  if (req.body.relievingLetter == "") {
    info.relieving_letter = dat.relieving_letter;
  } else {
    info.relieving_letter = req.files.relievingLetter.name;
  }
  if (req.body.type == "Recent") {
    if (req.body.offerLetter != "") {
      folderFunctions.removeFile(
        dat.offer_letter,
        req.body.fk_employment_users_id
      );
      info.offer_letter = req.files.offerLetter.name;
    }
    if (req.body.payslip1 != "") {
      folderFunctions.removeFile(
        dat.pay_slip1,
        req.body.fk_employment_users_id
      );
      info.pay_slip1 = req.files.payslip1.name;
    }
    if (req.body.payslip2 != "") {
      folderFunctions.removeFile(
        dat.pay_slip2,
        req.body.fk_employment_users_id
      );
      info.pay_slip2 = req.files.payslip2.name;
    }
    if (req.body.payslip3 != "") {
      info.pay_slip3 = req.files.payslip3.name;
      folderFunctions.removeFile(
        dat.pay_slip3,
        req.body.fk_employment_users_id
      );
    }
    if (req.body.offerLetter == "") {
      info.offer_letter = dat.offer_letter;
    }
    if (req.body.payslip1 == "") {
      info.pay_slip1 = dat.pay_slip1;
    }
    if (req.body.payslip2 == "") {
      info.pay_slip2 = dat.pay_slip2;
    }
    if (req.body.payslip3 == "") {
      info.pay_slip3 = dat.pay_slip3;
    }
    info.notice_date = req.body.noticePeriodEndDate;
  }

  let employmentData = await employmentDetails.update(info, {
    where: { id: ids },
  });
  if (employmentData) {
    folderFunctions.uploadfile(req.files, req.body.fk_employment_users_id);
    console.log("updated");
    res.send({ message: "updated" });
  }
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
    where: { id: id },
  });
  console.log(data);
  res.send(data);
};

//adding educational details
const addEducation = async (req, res) => {
  const userData = await user.findOne({
    where: { id: req.body.fk_education_users_id },
  });
  const edData = await educationalInfo.findOne({
    where: { id: req.body.fk_education_users_id, type: "Graduation" },
  });
  if (edData) {
    const usercredential = await user.update(
      { status: userData.status + 20 },

      { where: { id: req.body.fk_education_users_id } }
    );
  }

  console.log(req.body);
  console.log(req.files);
  const info = {
    type: req.body.education,
    name: req.body.School,
    board: req.body.board,
    course: req.body.course,
    specialization: req.body.specialization,
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    marks: req.body.percentage,
    marks_card: req.files.marksheet.name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_education_users_id: req.body.fk_education_users_id,
  };
  if (
    req.body.education == "Graduation" ||
    req.body.education == "Masters/Post-Graduation"
  ) {
    console.log("inside if");
    info.status = "completed";
    if (req.body.provisionalCertificate != "") {
      console.log("s");
      info.provisional_marks_card = req.files.provisionalCertificate.name;
    }
    if (req.body.convocationCertificate != "") {
      info.convocation_certificate = req.files.convocationCertificate.name;
    }
  }
  const educationData = await educationalInfo.create(info);
  if (educationData) {
    folderFunctions.uploadfile(req.files, req.body.fk_education_users_id);
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
  let dat = await educationalInfo.findOne({
    where: { id: id },
  });
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
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_education_users_id: req.body.fk_education_users_id,
  };
  if (
    req.body.education == "Graduation" ||
    req.body.education == "Masters/Post-Graduation"
  ) {
    if (req.body.provisionalCertificate != "") {
      console.log(dat.provisional_marks_card);
      console.log(req.files.provisionalCertificate.name);

      if (dat.provisional_marks_card != req.files.provisionalCertificate.name) {
        folderFunctions.removeFile(
          dat.provisional_marks_card,
          req.body.fk_education_users_id
        );
      }
      info.provisional_marks_card = req.files.provisionalCertificate.name;
    }
    if (req.body.convocationCertificate != "") {
      if (
        dat.convocation_certificate != req.files.convocationCertificate.name
      ) {
        folderFunctions.removeFile(
          dat.convocation_certificate,
          req.body.fk_education_users_id
        );
      }
      info.convocation_certificate = req.files.convocationCertificate.name;
    }
    if (req.body.provisionalCertificate == "") {
      info.provisional_marks_card = dat.provisional_marks_card;
    }
    if (req.body.convocationCertificate == "") {
      info.convocation_certificate = dat.convocation_certificate;
    }
  }
  if (req.body.marksheet == "") {
    info.marks_card = dat.marks_card;
  } else if (dat.marks_card != req.files.marksheet.name) {
    info.marks_card = req.files.marksheet.name;
    folderFunctions.removeFile(dat.marks_card, req.body.fk_education_users_id);
  }

  let educationData = await educationalInfo.update(info, {
    where: { id: id },
  });
  folderFunctions.uploadfile(req.files, req.body.fk_education_users_id);
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
const addOtherDetailsAndBankDetails = async (req, res) => {
  const userData = await user.findOne({
    where: { id: req.body.fk_proof_users_id },
  });

  const usercredential = await user.update(
    { status: userData.status + 20 },

    { where: { id: req.body.fk_proof_users_id } }
  );
  console.log(req.body);
  const info = {
    aadhar_card_number: req.body.aadhar_card_number,
    aadhar: req.files.aadharCard.name,
    pan_card_number: req.body.pan_card_number,
    pan_card: req.files.panCard.name,
    passport_number: req.body.passport_number,
    passport_expire_date: req.body.passport_expire,
    covid_certificate: req.files.covidCertificate.name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    status: "completed",
    fk_proof_users_id: req.body.fk_proof_users_id,
  };
  if (req.body.passportDetails != "") {
    info.passport = req.files.passportDetails.name;
  }
  let bank = {
    account_holder_name: req.body.acc_holder_name,
    account_number: req.body.acc_number,
    account_type: req.body.type_of_acc,
    bank_name: req.body.bank_name,
    ifsc_code: req.body.ifsc_code,
    pf_account_number: req.body.pf_acc,
    uan_account_number: req.body.uan_acc,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_bank_users_id: req.body.fk_proof_users_id,
  };
  const proofData = await otherDetails.create(info);
  const bankData = await bankdetails.create(bank);
  if (proofData && bankData) {
    console.log("other detail inside");
    folderFunctions.uploadfile(req.files, req.body.fk_proof_users_id);
    res.status(200).send({ message: "Successful" });
  } else {
    res.status(400).send({ message: "Unsuccessful" });
  }
};
//get OtherDetail based on id
const getOtherDetailAndBankDetails = async (req, res) => {
  let id = req.params.id;
  let proofData = await otherDetails.findOne({
    where: { fk_proof_users_id: id },
  });
  let bankData = await bankdetails.findOne({
    where: { fk_bank_users_id: id },
  });
  let datas = [proofData, bankData];
  console.log(proofData);
  if (proofData && bankData) {
    res.send(datas);
  } else {
    res.send([]);
  }
};
//update perticular/specific OtherDetail i.e by id
const updateOtherDetailAndBankDetails = async (req, res) => {
  let ids = req.params.id;
  let dat = await otherDetails.findOne({ where: { fk_proof_users_id: ids } });
  const info = {
    aadhar_card_number: req.body.aadhar_card_number,
    aadhar: req.files.aadharCard.name,
    pan_card_number: req.body.pan_card_number,
    pan_card: req.files.panCard.name,
    passport_number: req.body.passport_number,
    passport_expire_date: req.body.passport_expire,
    covid_certificate: req.files.covidCertificate.name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_proof_users_id: req.body.fk_proof_users_id,
  };
  if (req.body.passportDetails == "") {
    info.passport = dat.passport;
  } else if (dat.passport != req.files.passportDetails.name) {
    folderFunctions.removeFile(dat.passport, req.body.fk_proof_users_id);
    info.passport = req.body.passportDetails;
  } else {
    info.passport = req.body.passportDetails;
  }
  let bank = {
    account_holder_name: req.body.acc_holder_name,
    account_number: req.body.acc_number,
    account_type: req.body.type_of_acc,
    bank_name: req.body.bank_name,
    ifsc_code: req.body.ifsc_code,
    pf_account_number: req.body.pf_acc,
    uan_account_number: req.body.uan_acc,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_bank_users_id: req.body.fk_proof_users_id,
  };
  let proofData = await otherDetails.update(info, {
    where: { fk_proof_users_id: ids },
  });
  let bankData = await bankdetails.update(bank, {
    where: { fk_bank_users_id: ids },
  });

  if (proofData && bankData) {
    folderFunctions.uploadfile(req.files, req.body.fk_proof_users_id);
    res.send({ message: "updated" });
  } else {
    res.send({ message: "cannot update" });
  }
};

//adding declaration
const addDeclaration = async (req, res) => {
  const userData = await user.findOne({
    where: { id: req.body.fk_declaration_users_id },
  });

  const usercredential = await user.update(
    { status: userData.status + 20 },

    { where: { id: req.body.fk_declaration_users_id } }
  );
  console.log(req.body);
  const info = {
    joining_date: req.body.joiningDate,
    place: req.body.place,
    date: req.body.date,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    status: "completed",
    fk_declaration_users_id: req.body.fk_declaration_users_id,
  };
  const declarationData = await declaration.create(info);
  if (declarationData) {
    res.status(200).send({ message: "Successful" });
  } else {
    res.status(400).send({ message: "Unsuccessful" });
  }
};
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
const forgotpassword = async (req, res) => {
  let userMail = req.body.email;
  let userdata = await user.findOne({ where: { email: userMail } });
  let admindata = await admin.findOne({ where: { email: userMail } });
  let password = req.body.email.substring(0, 5);
  let pass = "N" + password + "@!" + Math.floor(Math.random() * 10);
  const salt = genSaltSync(10);
  let chnagedPass = hashSync(pass, salt);
  console.log(userdata);
  console.log(admindata);
  if (userdata != null) {
    if (forgotPassEmail(pass, userMail)) {
      const usercredential = await user.update(
        { password: chnagedPass },

        { where: { email: userMail } }
      );
      if (usercredential) {
        res.status(200).send({ message: "Password Updated successfully" });
      } else {
        res.status(400).send({ message: "Password cannot be updated" });
      }
    }
  } else if (admindata != null) {
    if (forgotPassEmail(pass, userMail)) {
      const usercredential = await admin.update(
        { password: chnagedPass },

        { where: { email: userMail } }
      );
      if (usercredential) {
        res.status(200).send({ message: "Password Updated successfully" });
      } else {
        res.status(400).send({ message: "Password cannot be updated" });
      }
    }
  } else {
    res.status(200).send({ message: "Email doesnt exists" });
  }
};
function forgotPassEmail(pass, email) {
  mailOptions.to = `${email}`;
  (mailOptions.subject = "WELCOME TO DIGGIBYTE FAMILY"),
    (mailOptions.text = `username: ${email}

                        password:${pass}`);

  const data = transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("sent");
    }
  });
  return true;
}
const checkPassword = async (req, res) => {
  const oldPass = req.body.autoPass;
  let newpas = req.body.password;
  const salt = genSaltSync(10);
  let chnagedPass = hashSync(newpas, salt);
  let Useremail = req.body.email;
  const userdata = await user.findOne({ where: { email: Useremail } });
  const admindata = await admin.findOne({ where: { email: Useremail } });
  if (userdata != null) {
    if (compareSync(oldPass, userdata.password)) {
      const usercredential = await user.update(
        { password: chnagedPass },

        { where: { email: Useremail } }
      );
      if (usercredential) {
        res.status(200).send({ message: "Password Updated successfully" });
      } else {
        res.status(400).send({ message: "Password cannot be updated" });
      }
    }
  } else if (admindata != null) {
    if (compareSync(oldPass, admindata.password)) {
      const usercredential = await admin.update(
        { password: chnagedPass },

        { where: { email: Useremail } }
      );
      if (usercredential) {
        res.status(200).send({ message: "Password Updated successfully" });
      } else {
        res.status(400).send({ message: "Password cannot be updated" });
      }
    }
  }
};
const addImg = async (req, res) => {
  let img = req.files.photo.name;
  const data = await user.findOne({ where: { id: req.body.id } });
  if (data.photo != req.files.photo.name) {
    folderFunctions.removeFile(data.photo, req.body.id);
  }
  const usercredential = await user.update(
    { photo: img },

    { where: { id: req.body.id } }
  );
  folderFunctions.uploadfile(req.files, req.body.id);
  res.send({ message: "added sucessfully" });
};
const getImg = async (req, res) => {
  let reqId = req.params.id;
  const data = await user.findOne({ where: { id: reqId } });
  console.log(data.photo);
  res.send(data);
};
const getOfferLetter = async (req, res) => {
  let reqId = req.params.id;
  const data = await user.findOne({ where: { id: reqId } });
  res.send(data);
};
const getStatus = async (req, res) => {
  let reqId = req.params.id;
  const personal = await personalInfo.findOne({
    where: { fk_person_users_id: reqId },
    attributes: ["status"],
  });
  const educational_info = await educationalInfo.findOne({
    where: { fk_education_users_id: reqId, type: "Graduation" },
    attributes: ["status"],
  });
  const employment = await employmentDetails.findOne({
    where: { fk_employment_users_id: reqId },
    attributes: ["status"],
  });
  const otherdetails = await otherDetails.findOne({
    where: { fk_proof_users_id: reqId },
    attributes: ["status"],
  });
  const decla = await declaration.findOne({
    where: { fk_declaration_users_id: reqId },
    attributes: ["status"],
  });
  res.send({
    personStatus: personal,
    edStatus: educational_info,
    empStatus: employment,
    othStatus: otherdetails,
    decStatus: decla,
  });
};
module.exports = {
  addPersonalInfo,
  updatePersonalInfo,
  updateAddAddress,
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
  addOtherDetailsAndBankDetails,
  getOtherDetailAndBankDetails,
  updateOtherDetailAndBankDetails,
  addDeclaration,
  getDeclaration,
  updateDeclaration,
  forgotpassword,
  checkPassword,
  addImg,
  getImg,
  getOfferLetter,
  getStatus,
};
