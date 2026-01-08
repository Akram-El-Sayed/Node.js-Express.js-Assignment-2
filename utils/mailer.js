const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.MAILER_PORT ,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
    }
})

async function SenMail(email, message, title ) {
    try {
       await transporter.sendMail({
            subject: title,
            from: process.env.AUTH_USER,
            to: email,
            text: message,
            html:`<h1>${message}</h1>`
        
        })
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
    
} 

module.exports = {SenMail}