//to send mail v should install nodemailer
require("dotenv").config({
  path: "/home/diggiserveradmin/back-end/onboarding-backend/server/text.env",
});

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  requireTLS: false,
  tls: {
    rejectUnauthorized: false,
  },

  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

const mailOptions = {
  from: "test@diggibyte.com",
};

module.exports = { transporter, mailOptions };
