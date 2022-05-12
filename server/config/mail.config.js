//to send mail v should install nodemailer
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "subrathkumarpatra1996@gmail.com",
    pass: "ewzoadaazyeocmst",
  },
});
const mailOptions = {
  from: "subrathkumarpatra1996@gmail.com",
  subject: "Welcome to Diggibyte Family",
};
module.exports = { transporter, mailOptions };
