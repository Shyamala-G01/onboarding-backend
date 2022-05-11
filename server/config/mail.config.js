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
    subject:'Sending mail through node js on user added',
}
module.exports={transporter, mailOptions}