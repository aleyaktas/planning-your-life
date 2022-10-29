const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const crypto = require("crypto");
const mailSender = require("../../config/mailer");

// @route PUT api/profile
// @dexc Reset password
// @access Private
router.put("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    bcrypt.hash(req.body.password, 10).then(async (hashed) => {
      user.password = hashed;
      await user.save();
      res.status(200).send("successfull");
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).sendDate("Server error");
  }
});

// @route POST api/profile/forgot
// @dexc Forgot password
// @access Public
router.post("/forgot", async (req, res) => {
  try {
    var token;
    crypto.randomBytes(16, (err, buffer) => {
      if (err) {
        console.log(err);
      }
      token = buffer.toString("hex");
    });
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Link is invalid" }] });
    }
    if (user) {
      user.resetToken = token;
      user.save();
      mailSender(
        user.email,
        "Forgot Password ",
        `https://pyl.aleynaaktas.me/forgot/${token}`
      );
      return res
        .status(200)
        .json({
          message:
            "Check your email, if the mail is not showing, check your spam box.",
        });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).sendDate("Server error");
  }
});

// @route PUT api/profile/forgot
// @dexc New password
// @access Public
router.put("/forgot/:token", async (req, res) => {
  try {
    const user = await User.findOne({ resetToken: req.params.token });
    if (user) {
      bcrypt.hash(req.body.password, 10).then(async (hashed) => {
        user.password = hashed;
        user.resetToken = null;
        await user.save();
        return res
          .status(201)
          .json({ message: "Password changed successfully" });
      });
    } else if (!user) {
      return res.status(400).json({ errors: [{ msg: "Link is invalid" }] });
    }
  } catch (err) {
    res.status(500).sendDate("Server error");
  }
});

module.exports = router;
