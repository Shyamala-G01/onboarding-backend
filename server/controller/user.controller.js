const sq = require("sequelize");
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
//
const Op = sq.Op;
//import file handler to create folder
const folderFunctions = require("../controller/fileHandler");
//add data to personal info table
const addPersonalInfo = async (req, res) => {
  const data = await user.findOne({
    where: { id: req.body.fk_person_users_id },
  });

  const usercredential = await user.update(
    { status: data.status + 40 },

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
    res.status(200).send({message:'updated'});
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
  console.log(data.status);
  console.log(empDtat);
  if (empDtat == null) {
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
    (info.org_name = req.body.org_name),
      (info.joining_date = req.body.joining_date),
      (info.relieving_date = req.body.relieving_date),
      (info.relieving_letter = req.files.relieving_letter.name),
      (info.hr_name = req.body.hr_name);
  }
  if (req.body.type == "Recent") {
    info.offer_letter = req.files.offer_letter.name;
    info.pay_slip1 = req.files.pay_slip1.name;
    info.pay_slip2 = req.files.pay_slip2.name;
    info.pay_slip3 = req.files.pay_slip3.name;
    info.notice_date = req.body.notice_date;
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
    where: { type: { [Op.ne]: "Fresher" }, fk_employment_users_id: id },
    // where:{fk_employment_users_id: id },
  });
  console.log(employmentData);
  res.send(employmentData);
};

const updateEmployemnt = async (req, res) => {
  let ids = req.params.id;
  const dat = await employmentDetails.findOne({ where: { id: ids } });
  const info = {
    type: req.body.type,
    org_name: req.body.org_name,
    joining_date: req.body.joining_date,
    relieving_date: req.body.relieving_date,
    hr_name: req.body.hr_name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_employment_users_id: req.body.fk_employment_users_id,
  };
  if (req.body.relieving_letter == "" || typeof(req.body.relieving_letter)=="string" ) {
    info.relieving_letter = dat.relieving_letter;
  } else {
    info.relieving_letter = req.files.relieving_letter.name;
  }
  if (req.body.type == "Recent") {
    if (typeof(req.body.offer_letter) != "string") {
      folderFunctions.removeFile(
        dat.offer_letter,
        req.body.fk_employment_users_id
      );
      info.offer_letter = req.files.offer_letter.name;
    }
    if (typeof(req.body.pay_slip1 )!= "string") {
      folderFunctions.removeFile(
        dat.pay_slip1,
        req.body.fk_employment_users_id
      );
      info.pay_slip1 = req.files.pay_slip1.name;
    }
    if (typeof(req.body.pay_slip2) != "string") {
      folderFunctions.removeFile(
        dat.pay_slip2,
        req.body.fk_employment_users_id
      );
      info.pay_slip2 = req.files.pay_slip2.name;
    }
    if (typeof(req.body.pay_slip3) != "string") {
      info.pay_slip3 = req.files.pay_slip3.name;
      folderFunctions.removeFile(
        dat.pay_slip3,
        req.body.fk_employment_users_id
      );
    }
    if (req.body.offer_letter= "" || typeof(req.body.offer_letter)=='string') {
      info.offer_letter = dat.offer_letter;
    }
    if (req.body.pay_slip1 == "" || typeof(req.body.pay_slip1)=='string') {
      info.pay_slip1 = dat.pay_slip1;
    }
    if (req.body.pay_slip2 == "" || typeof(req.body.pay_slip2)=='string') {
      info.pay_slip2 = dat.pay_slip2;
    }
    if (req.body.pay_slip3 == "" || typeof(req.body.pay_slip3)=='string') {
      info.pay_slip3 = dat.pay_slip3;
    }
    info.notice_date = req.body.notice_date;
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
  const edData = await educationalInfo.findAll({
    where: { id: req.body.fk_education_users_id },
  });
  if (edData.length >= 3) {
    const usercredential = await user.update(
      { status: userData.status + 20 },

      { where: { id: req.body.fk_education_users_id } }
    );
  }

  console.log(req.body);
  console.log(req.files);
  const info = {
    type: req.body.type,
    name: req.body.name,
    board: req.body.board,
    course: req.body.course,
    specialization: req.body.specialization,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    marks: req.body.marks,
    marks_card: req.files.marks_card.name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_education_users_id: req.body.fk_education_users_id,
  };
  if (
    req.body.type == "Graduation" ||
    req.body.type == "Masters/Post-Graduation"
  ) {
    console.log("inside if");
    info.status = "completed";
    if (req.body.provisional_marks_card != "") {
      console.log("s");
      info.provisional_marks_card = req.files.provisional_marks_card.name;
    }
    if (req.body.convocation_certificate != "") {
      info.convocation_certificate = req.files.convocation_certificate.name;
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
  console.log(req.body)
  console.log(req.files)
  let id = req.params.id;
  let dat = await educationalInfo.findOne({
    where: { id: id },
  });
  const info = {
    type: req.body.type,
    name: req.body.name,
    board: req.body.board,
    course: req.body.course,
    specialization: req.body.specialization,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    marks: req.body.marks,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_education_users_id: req.body.fk_education_users_id,
  };
  if (
    req.body.type == "Graduation" ||
    req.body.type == "Masters/Post-Graduation"
  ) {
    if (typeof(req.body.convocation_certificate) != "string") {
      console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
       info.convocation_certificate = req.files.convocation_certificate.name;
       console.log(req.files.convocation_certificate.name)
         folderFunctions.removeFile(
           dat.convocation_certificate,
           req.body.fk_education_users_id
         );
     }
    if (typeof(req.body.provisional_marks_card) != "string") {
      info.provisional_marks_card = req.files.provisional_marks_card.name;
      folderFunctions.removeFile(
        dat.provisional_marks_card,
        req.body.fk_education_users_id
      );
    }
    
    if (
      req.body.provisional_marks_card == "" ||
      typeof(req.body.provisional_marks_card)=='string'
    ) {
      info.provisional_marks_card = dat.provisional_marks_card;
    }
    if (
      req.body.convocation_certificate == "" ||
      typeof(req.body.provisional_marks_card)=='string'
    ) {
      info.convocation_certificate = dat.convocation_certificate;
    }
  }
  if (req.body.marks_card == "" || typeof(req.body.marks_card)=='string') {
    info.marks_card = dat.marks_card;
  }
  if (typeof(req.body.marks_card) != "string") {
    info.marks_card = req.files.marks_card.name;
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
    aadhar: req.files.aadhar.name,
    pan_card_number: req.body.pan_card_number,
    pan_card: req.files.pan_card.name,
    passport_number: req.body.passport_number,
    passport_expire_date: req.body.passport_expire_date,
    covid_certificate: req.files.covid_certificate.name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    status: "completed",
    fk_proof_users_id: req.body.fk_proof_users_id,
  };
  if (req.body.passport != "") {
    info.passport = req.files.passport.name;
  }
  let bank = {
    account_holder_name: req.body.account_holder_name,
    account_number: req.body.account_number,
    account_type: req.body.account_type,
    bank_name: req.body.bank_name,
    ifsc_code: req.body.ifsc_code,
    pf_account_number: req.body.pf_account_number,
    uan_account_number: req.body.uan_account_number,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    fk_bank_users_id: req.body.fk_bank_users_id,
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
  console.log(req.body.passport_expire_date);
  let ids = req.params.id;
  let dat = await otherDetails.findOne({ where: { fk_proof_users_id: ids } });
  const info = {
    aadhar_card_number: req.body.aadhar_card_number,
    pan_card_number: req.body.pan_card_number,
    passport_number: req.body.passport_number,
    passport_expire_date: req.body.passport_expire_date,
    // covid_certificate: req.files.covid_certificate.name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    status: "completed",
    fk_proof_users_id: req.body.fk_proof_users_id,
  };
  if (req.body.aadhar == "") {
    info.aadhar = dat.aadhar;
  }
  if (req.body.aadhar != "") {
    info.aadhar = req.files.aadhar.name;
    folderFunctions.removeFile(dat.aadhar, req.body.fk_proof_users_id);
  }
  if (req.body.covid_certificate == "") {
    info.covid_certificate = dat.covid_certificate;
  }
  if (req.body.covid_certificate != "") {
    info.covid_certificate = req.files.covid_certificate.name;
    folderFunctions.removeFile(
      dat.covid_certificate,
      req.body.fk_proof_users_id
    );
  }
  if (req.body.passport == "") {
    info.passport = dat.passport;
  }
  if (req.body.passport != "") {
    folderFunctions.removeFile(dat.passport, req.body.fk_proof_users_id);
    info.passport = req.files.passport.name;
  }
  if (req.body.pan_card == "") {
    info.pan_card = dat.pan_card;
  }
  if (req.body.pan_card != "") {
    folderFunctions.removeFile(dat.pan_card, req.body.fk_proof_users_id);
    info.passport = req.files.pan_card.name;
  }
  let bank = {
    account_holder_name: req.body.account_holder_name,
    account_number: req.body.account_number,
    account_type: req.body.account_type,
    bank_name: req.body.bank_name,
    ifsc_code: req.body.ifsc_code,
    pf_account_number: req.body.pf_account_number,
    uan_account_number: req.body.uan_account_number,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    status: "completed",
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
  let dec = await user.findOne({where: {id:fk_declaration_users_id}})
 console.log(declarationData);

  res.send( [declarationData,dec.status]);};
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
  if(declarationData){

    res.send({ message: "updated" });
  }
 
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
    {
      photo: img,
      updated_at: req.body.updated_at,
      updated_by: req.body.updated_by,
    },

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
