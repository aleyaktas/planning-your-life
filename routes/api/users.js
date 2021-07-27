const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
// test route
router.get('/', (req, res) => {
  console.log(req.body);
  res.send('User route')
});

// POST api/users
// Register user
// Public 
router.post('/', [
  check('firstname','First name is required')
    .not()
    .isEmpty(),
  check('lastname','Last name is required')
    .not()
    .isEmpty(),
  check('email','Please include a valid email').isEmail(),
  check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })
],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { firstname,lastname,email,password } = req.body;

    try{
      // See if user exists
      let user = await User.findOne({ email }) 

      if(user) {
        return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
      }
      // Get users gravatar

      const avatars = gravatar.url(email, {s: '200', r: 'pg', d: '404'});

      user = new User({
        firstname,
        lastname,
        email,
        avatars,
        password
      })

      // Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        });

      // res.send('User registered')
    } catch(err) {
      console.log(err.message);
      res.status(500).send('Server error')
    }
    
  });


module.exports = router;