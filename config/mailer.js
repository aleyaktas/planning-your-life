var nodemailer = require("nodemailer");

const mailSender = (email, subject, message) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "planningyourlifewebsite@gmail.com",
      pass: "Tsen1534.",
    },
  });

  var mailOptions = {
    from: "planningyourlifewebsite@gmail.com",
    to: `${email}`,
    subject: `${subject} - Your Word World`,
    text: `${message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = mailSender;