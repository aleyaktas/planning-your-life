const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route GET api/profile
// @dexc Get current user profile
// @access Private
router.get('/', auth, async (req, res) => { 
  try{
    const user =await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err){
    console.log(err.message);
    res.status(500).sendDate('Server error');
  }
});


module.exports = router;