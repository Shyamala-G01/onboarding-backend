const sq = require("sequelize");
const db = require("../model");
const user = db.user;
const admin = db.admin;
const comment = db.comments;
//get all models of a user
const PersnonalInfo = db.personalInfo;
const Address = db.address;
const EducationalInfo = db.educationalInfo;
const EmploymentDetails = db.employmentDetails;
const ProofCertificates = db.proofCertificates;
const BankDetails = db.bankDetails;
const Declaration = db.declaration;
const notification = db.notification;
// const hbs = require('nodemailer-express-handlebars');
const Op = sq.Op;
//encrypting and comparing
const { genSaltSync, hashSync } = require("bcrypt");

//mailing
const mail = require("../config/mail.config");

const mailOptions = mail.mailOptions;
const transporter = mail.transporter;

// //import file handler to create folder
const folderFunctions = require("../controller/fileHandler");
const { Sequelize } = require("../model");
// contoller for adding admin
const addAdmin = async (req, res) => {
  const salt = genSaltSync(10);
  // already exit or not
  const adminMail = await admin.findOne({ where: { email: req.body.email } });
  if (adminMail) {
    console.log("admin");
    res.send({ message: "Admin Exists" });
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
    let password = req.body.id;
    let pass = password.substring(0, 2) + "@#" + password.substring(2, 6);
    info.password = hashSync(pass, salt);
    const adminData = await admin.create(info);
    if (adminData) {
      // sending mail after registration
      //to send mail on adding user
      mailOptions.to = `${info.email}`;
      (mailOptions.subject = "Admin Portal - Welcome To Diggibyte"),
        (mailOptions.html = `Dear ${info.name},<br><br>
        Welcome to Onboarding Web App, you have registered as "<b>Admin</b>".<br><br>
        Here you can be able to access all the data of the employees who have registered in our Onboarding Web App.You will be provided with the access to view, edit and delete the details and documents provided by the employees.<br><br>

URL: http://52.172.88.185/<br><br>

username: ${info.email}<br>
password: ${pass}<br><br>

Thank You,<br>
HR Department.<br>
Stay Safe! Stay Healthy! 
`);

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
      res.status(404).send({ message: "Cannot Register Successfully" });
    }
  }
};

// contoller for adding employee
const addEmployee = async (req, res) => {
  folderFunctions.createFolder(req.body.id);
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
      // offer_letter: req.files.offerLetter.name,
      designation: req.body.designation,
      created_at: req.body.created_at,
      created_by: req.body.created_by,
      updated_at: req.body.updated_at,
      updated_by: req.body.updated_by,
      status: req.body.status,
    };
    // let password = req.body.name.replaceAll(" ", "");
    // let pass = password + "@!" + Math.floor(Math.random() * 10);
    let password = req.body.id;
    let pass = password.substring(0, 2) + "@#" + password.substring(2, 6);
    info.password = hashSync(pass, salt);
    const userData = await user.create(info);
    if (userData) {
      // sending mail after registration
      //to send mail on adding user
      mailOptions.to = `${info.email}`;
      mailOptions.subject =
        "Important!! - Welcome To Diggibyte! Let's Get You Started";
      //   (mailOptions. attachments= [{
      //     path: "./assets/images/emailtemplate.png",
      //     filename: "emailtemplate.png",
      //     cid: "emailtemplate.png" + "@"
      //  }]);
      mailOptions.html = `Dear ${info.name},<br><br>We take great pleasure in <b>welcoming you to Diggibyte Family!</b><br><br>
As you join us, we are sure that you would play an important role in helping us distinguish, enrich and propel us into our future.
We value your feedback and would like to hear from you.<br><br> 
    

Please complete your onboarding details by clicking below URL.<br><br>
            
URL: http://52.172.88.185/<br><br>
    
Username: ${info.email}<br>
Password: ${pass}<br><br>

Thank You,<br>
HR Department<br>
Stay Safe! Stay Healthy!
`;

      transporter.sendMail(mailOptions, function (err, info) {
        console.log("transporter");
        if (err) {
          console.log("err " + err);
        } else {
          console.log("mail sent" + info.response);
        }
      });
      folderFunctions.uploadfile(req.files, req.body.id);
      //add notification
      let notify = {
        name: req.body.name,
        message: "Employee Added",
        noti_date: req.body.created_at,
      };
      const notific = await notification.create(notify);

      res.status(200).send({ message: "Registered Successfully" });
    } else {
      res.status(404).send({ message: "Cannot Register" });
    }
  }
};

//delete notification
const deletenotification = async (req, res) => {
  let deletenoti = await notification.destroy({ truncate: true });
  let count = await notification.count();
  res.send({ counts: count });
};

const getEmploees = async (req, res) => {
  let users = await user.findAll({});
  res.send(users);
};
const getEmploy = async (req, res) => {
  let users = await user.findAll({ where: { id: req.params.id } });
  res.send(users);
};
const getEmployeeById = async (req, res) => {
  try {
    let users = await user.findAll({
      include: [
        {
          model: PersnonalInfo,
          as: "personal_info",
        },
        {
          model: Address,
          as: "address",
        },
        {
          model: EducationalInfo,
          as: "educational_info",
        },
        {
          model: EmploymentDetails,
          as: "employment_details",
        },
        {
          model: ProofCertificates,
          as: "other_details",
        },
        {
          model: BankDetails,
          as: "bank_detail",
        },
        {
          model: Declaration,
          as: "other_declaration",
        },
        {
          model: comment,
          as: "comment",
        },
      ],
      where: { id: req.params.id },
    });
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};
const addImg = async (req, res) => {
  let img = req.files.photo.name + "-" + req.body.id;
  const data = await admin.findOne({ where: { id: req.body.id } });
  if (data.photo != req.files.photo.name) {
    folderFunctions.removeAdminImg(data.photo);
  }
  const usercredential = await admin.update(
    { photo: img },

    { where: { id: req.body.id } }
  );
  folderFunctions.uploadAdminImg(req.files.photo, req.body.id);
  res.send({ message: "added sucessfully" });
};
const getImg = async (req, res) => {
  let reqId = req.params.id;
  const data = await admin.findOne({ where: { id: reqId } });
  res.send({ pic: data.photo });
};
const getRecentEmployees = async (req, res) => {
  const endDate = new Date();
  const startDate = new Date(Date.now() - 48 * 3600 * 1000);
  let users = await user.findAll({
    where: {
      created_at: {
        [Op.between]: [startDate, endDate],
      },
    },
    order: [["created_at", "DESC"]],
  });
  res.send(users);
};
const deleteEmployee = async (req, res) => {
  let ids = req.params.id;
  let userdata = await user.findOne({ where: { id: ids } });

  let notifyobj = {
    name: userdata.name,
    message: "Employee Deleted",
    noti_date: new Date(),
  };
  let datas = await notification.create(notifyobj);

  let data = await user.destroy({
    where: { id: ids },
  });
  await admin.destroy({
    where: { id: ids },
  });
  res.send({ message: "deleted" });
};
const getTotals = async (req, res) => {
  const totalCount = await user.count();
  let notifications = await notification.findAll();
  let notifycount = await notification.count();
  const pendCount = await user.count({ where: { status: { [Op.lt]: 100 } } });
  res.send({
    total: totalCount,
    pcount: pendCount,
    noti: notifications,
    noticount: notifycount,
  });
};
const getPendingRecord = async (req, res) => {
  const penRecords = await user.findAll({
    where: { status: { [Op.lt]: 100 } },
  });
  res.send(penRecords);
};

const putProofDetails = async (req, res) => {
  let ids = req.params.id;
  let dat = await ProofCertificates.findOne({
    where: { fk_proof_users_id: ids },
  });
  const info = {
    aadhar_card_number: req.body.aadhar_card_number,
    pan_card_number: req.body.pan_card_number,
    passport_number: req.body.passport_number,
    passport_expire_date: req.body.passport_expire,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    esi_no: req.body.esi_no,
    fk_proof_users_id: req.body.fk_proof_users_id,
  };
  if (req.body.aadhar == "" || typeof req.body.aadhar == "string") {
    info.aadhar = dat.aadhar;
  }
  if (typeof req.body.aadhar != "string") {
    info.aadhar = req.files.aadhar.name;
    folderFunctions.removeFile(dat.aadhar, req.body.fk_proof_users_id);
  }
  if (
    req.body.covid_certificate == "" ||
    typeof req.body.covid_certificate == "string"
  ) {
    info.covid_certificate = dat.covid_certificate;
  }
  if (typeof req.body.covid_certificate != "string") {
    info.covid_certificate = req.files.covid_certificate.name;
    folderFunctions.removeFile(
      dat.covid_certificate,
      req.body.fk_proof_users_id
    );
  }
  if (req.body.passport == "" || typeof req.body.passport == "string") {
    info.passport = dat.passport;
  }
  if (typeof req.body.passport != "string") {
    folderFunctions.removeFile(dat.passport, req.body.fk_proof_users_id);
    info.passport = req.files.passport.name;
  }
  if (req.body.pan_card == "" || typeof req.body.pan_card == "string") {
    info.pan_card = dat.pan_card;
  }
  if (typeof req.body.pan_card != "string") {
    folderFunctions.removeFile(dat.pan_card, req.body.fk_proof_users_id);
    info.pan_card = req.files.pan_card.name;
  }

  let proofData = await ProofCertificates.update(info, {
    where: { fk_proof_users_id: ids },
  });
  if (!proofData) {
    folderFunctions.uploadfile(req.files, req.body.fk_proof_users_id);
    res.send({ message: "cannot update" });
  } else {
    res.send({ message: "updated" });
  }
};
const putBankDetails = async (req, res) => {
  let ids = req.params.id;
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
    esi_no: req.body.esi_no,
    fk_bank_users_id: req.body.fk_proof_users_id,
  };
  let bankData = await BankDetails.update(bank, {
    where: { fk_bank_users_id: ids },
  });

  if (bankData) {
    res.send({ message: "updated" });
  } else {
    res.send({ message: "cannot update" });
  }
};
const deleteFile = async (req, resp) => {
  let ids = req.params.id;
  folderFunctions.removeFile(req.body.fileName, ids);
};
const sendEmailForPendingProfile = async (req, res) => {
  var emails = [];

  // const penRecords = await user.findAll({
  //   where: { status: { [Op.lt]: 100 } },
  // });
  // console.log(penRecords);
  // penRecords.forEach((element) => {
  //   emails.push(element.email);
  // });
  emails = req.body.email;

  emails.forEach((email) => {
    const mail = {
      from: "diggisupport@diggibyte.com",
      to: email,
      subject: "Remainder:To Complete Onboarding Profile",
      html: `Hi,<br><br>
    This mail is to remind you that your onboarding profile is still pending completion.
     We are looking forward to welcoming you to our team, but in order to do that, 
     we need you to complete and submit your onboarding profile as soon as possible.<br><br>
     Please make sure to complete and submit your onboarding profile.
    If you have any questions or need assistance, please reach out to the HR department.<br><br>
    Thank you for your prompt attention to this matter.<br><br>

    URL: http://52.172.88.185/<br><br>

    Regards,<br>
    <strong>HR Department</strong> `,
    };

    let data = transporter.sendMail(mail, function (err) {
      if (err) {
        res.send({ message: "Email Sent Unsuccessfully" });
      } else {
        res.send({ message: "Email Sent Successfully" });
      }
    });
  });
};
const sendComments = async (req, res) => {
  let ids = await user.findOne({
    attributes: ["id"],
    where: { name: req.body.name },
  });
  const info = {
    comments: req.body.comment,
    updated_at: req.body.updated_at,
    updated_by: req.body.updated_by,
    updated_by_id: req.body.updated_by_id,
    fk_comment_users_id: ids.id,
  };
  comment
    .create(info)
    .then((data) => {
      const mail = {
        from: "diggisupport@diggibyte.com",
        to: req.body.email,
        subject: `Remainder to complete onboarding profile`,
        html: `
   ${info.comments}<br><br>
   Thank you for your prompt attention to this matter.<br><br>

   URL: http://52.172.88.185/<br><br>

    Thanks,<br>
    <strong>HR Department</strong> `,
      };

      transporter.sendMail(mail, function (err) {
        if (err) {
          res.send({ message: "Email Sent Unsuccessfully" });
        } else {
          res.send({ message: "Email Sent Successfully", data: data });
        }
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
const sendApprovedEmail = async (req, res) => {
  let email = req.body.email;
  let id = req.body.user_id;
  let approved_at = req.body.approved_at;
  await PersnonalInfo.update(
    { status: "Completed" },
    { where: { fk_person_users_id: id } }
  );
  await EmploymentDetails.update(
    { status: "Completed" },
    { where: { fk_employment_users_id: id } }
  );
  await EducationalInfo.update(
    { status: "Completed" },
    { where: { fk_education_users_id: id } }
  );
  await ProofCertificates.update(
    { status: "Completed" },
    { where: { fk_proof_users_id: id } }
  );
  await BankDetails.update(
    { status: "Completed" },
    { where: { fk_bank_users_id: id } }
  );

  await Declaration.update(
    { status: "Completed" },
    { where: { fk_declaration_users_id: id } }
  );
  await user.update({ approved_status: "Completed" }, { where: { id: id } });
  await user.update({ approved_at: approved_at }, { where: { id: id } });
  await user.update({ completed_status: "Completed" }, { where: { id: id } });

  // let comments = req.body.comment

  const mail = {
    from: "diggisupport@diggibyte.com",
    to: email,
    subject: `Approved`,
    html: `Dear ${req.body.name},<br><br>
   We are pleased to inform you that your data and all documents has been successfully Approved by HR Department<br><br>
   Thank you for your prompt attention to this matter.<br><br>
   Thanks,<br>
   <strong>HR Department</strong>`,
  };

  const data = transporter.sendMail(mail, function (err) {
    if (err) {
      res.send({ message: "Email Sent Unsuccessfully" });
    } else {
      res.send({ message: "Email Sent Successfully" });
    }
  });
};
const getAdmins = async (req, res) => {
  let admins = await admin.findAll({});
  res.send(admins);
};
const deleteAdmin = async (req, res) => {
  let ids = req.params.id;
  let admindata = await admin.findOne({ where: { id: ids } });
  let data = await admin.destroy({
    where: { id: ids },
  });
  res.send({ message: "deleted" });
};
const getOneEmployeeData = async (req, res) => {
  try {
    let ids = await user.findOne({
     
      where: { name: req.body.name },
    });

    if (!ids) {
      return res.status(404).send("Employee not found");
    }

    let users = await user.findAll({
      include: [
        {
          model: PersnonalInfo,
          as: "personal_info",
        },
        {
          model: Address,
          as: "address",
        },
        {
          model: EducationalInfo,
          as: "educational_info",
        },
        {
          model: EmploymentDetails,
          as: "employment_details",
        },
        {
          model: ProofCertificates,
          as: "other_details",
        },
        {
          model: BankDetails,
          as: "bank_detail",
        },
        {
          model: Declaration,
          as: "other_declaration",
        },
      ],
      where: { id: ids.id },
    });

    res.send(users);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getOneuserData = async (req, res) => {
  let data = await user.findOne({
    where: { name: req.body.name },
  });
  res.send(data);
};
module.exports = {
  addAdmin,
  addEmployee,
  getEmploees,
  getEmployeeById,
  addImg,
  getImg,
  getRecentEmployees,
  deleteEmployee,
  getTotals,
  getPendingRecord,
  putProofDetails,
  putBankDetails,
  deleteFile,
  deletenotification,
  sendEmailForPendingProfile,
  sendComments,
  sendApprovedEmail,
  getEmploy,
  getAdmins,
  deleteAdmin,
  getOneEmployeeData,
  getOneuserData,
};
