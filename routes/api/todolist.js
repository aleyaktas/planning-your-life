const express = require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const auth = require('../../middleware/auth');
const TodoList = require('../../models/TodoList');
const User = require('../../models/User');



// POST api/todolist
// Create a todoList
// Private
router.post('/', 
  [
    auth, 
    [
      check('title','Title is required')
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

      const newTodoList = new TodoList({
        title: req.body.title,
        name: user.name,
        user: req.user.id
      });

      const todoList = await newTodoList.save();

      res.json(todoList);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }    
  });

// DELETE api/todolist
// Delete todolist & todos
// Private
router.delete('/' , auth, async (req,res) => {
  try {
    // Remove user todos
    await Todo.deleteMany({ todoList: req.todoList.id })

    // Remove todoList
    await TodoList.findOneAndRemove({ user: req.user.id });

    res.json({ msg: 'Todo List deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;