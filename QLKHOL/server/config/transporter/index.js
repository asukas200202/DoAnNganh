const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "0967042099pro@gmail.com",
    pass: "hpew pvvy snmz arjv",
  },
  tls: {
    rejectUnauthorized: false
  }
})


module.exports = transporter 