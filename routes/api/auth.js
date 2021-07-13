const express = require('express');
const router = express.Router();

// GET api/users 
// Public
// api/auth/

router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;