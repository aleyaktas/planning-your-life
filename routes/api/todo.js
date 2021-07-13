const express = require('express');
const router = express.Router();

// GET api/users 
// Public
// api/todo

router.get('/', (req, res) => res.send('Todo route'));

module.exports = router;