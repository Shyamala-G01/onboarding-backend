//to send mail v should install nodemailer
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.in',
  auth: {
    user: "test@diggibyte.com",
    pass: "Full$tack@!@#!!",
  },
});
const mailOptions = {
  from: "test@diggibyte.com",
  subject: "Welcome to Diggibyte Family",
};
module.exports = { transporter, mailOptions };
