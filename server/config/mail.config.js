//to send mail v should install nodemailer

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: "smtp.office365.com",

  port: 587,

  secure: false,
requireTLS:false,
  tls: {
    rejectUnauthorized: false,
  },

  auth: {
    user: "test@diggibyte.com",
    pass: "fqcmkhqwqwmdfgjm",
  },
});

const mailOptions = {
  from: "test@diggibyte.com",
  subject: "Sending mail through node js on user added",
};

module.exports = { transporter, mailOptions };
