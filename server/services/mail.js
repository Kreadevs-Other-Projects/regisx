const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nighthawk.og01@gmail.com",
    pass: "tpta hlig ljir bimr",
  },
});

module.exports = { transporter };
