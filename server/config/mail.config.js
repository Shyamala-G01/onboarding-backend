//to send mail v should install nodemailer
const nodemailer=require('nodemailer')
const transporter= nodemailer.createTransport({
    service:'diggibyte',
    auth:{
        user:'test@diggibyte.com',
        pass:'Full$tack@!@#!!',

    }
})
const mailOptions={
    from:'test@diggibyte.com',
    subject:'Welcome to Diggibyte Family',
}
module.exports={transporter, mailOptions}