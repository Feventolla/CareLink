const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zelalemtigist21@gmail.com',
        pass: process.env.email_password,
    },
});

module.exports = transporter;