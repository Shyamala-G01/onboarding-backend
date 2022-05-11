//to send mail v should install nodemailer
const nodemailer=require('nodemailer')
const transporter= nodemailer.createTransport({
    service:'diggibyte',
    auth:{
        user:'shyamala.g@diggibyte.com',
        pass:process.env.PASS,

    }
})
const mailOptions={
    from:'shyamalagopal719@gmail.com',
    to:'',
    subject:'Welcome to Diggibyte Family',
}
module.exports={transporter, mailOptions}