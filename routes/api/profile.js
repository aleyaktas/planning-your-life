const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route PUT api/profile
// @dexc Reset password
// @access Private
router.put('/', auth, async (req,res) => {
  try {
    const user = await User.findById(req.user.id)
    bcrypt.hash(req.body.password, 10).then(async hashed => {
      user.password = hashed ;
      await user.save();
      res.status(200).send("successfull")
    })
  } catch(err){
    console.log(err.message);
    res.status(500).sendDate('Server error');
  }
});

module.exports = router;