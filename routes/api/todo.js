const express = require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const auth = require('../../middleware/auth');
const Todo = require('../../models/Todo');
const User = require('../../models/User');


// POST api/todo
// Create a todo
// Private
router.post('/', 
  [
    auth, 
    [
      check('text','Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newTodo = new Todo({
        text: req.body.text,
        name: user.name,
        user: req.user.id
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }    
  });

// GET api/todo 
// Get all todos
// Private
router.get('/', auth, async (req,res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.json(todos)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET api/todo/:ID
// Get todo by ID
// Private
router.get('/:id', auth, async (req,res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if(!todo) return res.status(400).json({ msg: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Todo not found' });
    }
    res.status(500).send('Server Error');
  }
});

// DELETE api/todo/:ID
// Delete a todo
// Private

router.delete('/:id', auth, async (req,res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
      return res.status(404).json({ msg:'Todo not found' });
    }
    if(todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await todo.remove();

    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Todo not found' });
    }
    res.status(500).send('Server Error');
  }
});

// PUT api/todo/complete/:id
// Complete a todo
// Private
router.put('/complete/:id', auth, async (req,res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Check if the todo has already been
    if (todo.isCompleted) {
      return res.status(400).json({ msg: 'todo already completed' });
    }

    todo.isCompleted = true;

    await todo.save();

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


module.exports = router;