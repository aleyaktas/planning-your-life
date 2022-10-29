var nodemailer = require("nodemailer");

const mailSender = (email, message, link) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,

    secure: true,
    auth: {
      user: "planningyourlifewebsite@gmail.com",
      pass: "zvpxpbxjrwtrdpbb",
    },
  });

  var mailOptions = {
    from: "wordracewebsite@gmail.com",
    to: `${email}`,
    subject: `${message}`,
    text: `Hello ;\n\n Your password reset link:${link}\n`,
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
