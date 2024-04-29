const nodemailer = require("nodemailer");
require("dotenv/config");

const sendEmail = async (userEmail, expenseDetails) => {
  const transporter = nodemailer.createTransport({
    port: process.env.TRANSPORTER_PORT,
    host: process.env.TRANSPORTER_HOST,
    secure: false,
  });

  const MAIL_OPTIONS = {
    from: process.env.HOST_EMAIL,
    to: userEmail,
    subject: "despesa cadastrada",
    text: `despesa cadastrada: ${expenseDetails}`,
  };
  try {
    await transporter.sendMail(MAIL_OPTIONS);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email", error);
  }
};

module.exports = sendEmail;
