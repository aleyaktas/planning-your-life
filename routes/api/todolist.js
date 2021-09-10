const express = require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const auth = require('../../middleware/auth');
const TodoList = require('../../models/TodoList');
const Todo = require("../../models/Todo")
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

      const newTodoList = new TodoList({
        title: req.body.title,
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

router.delete('/:id', auth, async (req,res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);

    const todos = await Todo.find({todoList: req.params.id})
    
    if(!todoList) {
      return res.status(404).json({ msg:'Todolist not found' });
    }
    if(todoList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    if(todoList.title.toString() !== "My Day" && todoList.title.toString() !== "Important") {
      todos.map(async(todo) => await todo.remove())
      await todoList.remove();
      res.json({ msg: 'Todo List removed' });
    }
    
    
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Todo list not found' });
    }
    res.status(500).send('Server Error');
  }
});

// GET api/todolist
// Get all todo list by user id
// Private
router.get('/', auth, async (req,res) => {
  try {
    const todolist = await TodoList.find({user: req.user.id});
    res.json(todolist)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET api/todolist/:ID
// Get todolist by ID
// Private
router.get('/:id', auth, async (req,res) => {
  try {
    const todolist = await TodoList.findById(req.params.id);
    if(!todolist) return res.status(400).json({ msg: 'Todo List not found' });

    res.json(todolist);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Todo List not found' });
    }
    res.status(500).send('Server Error');
  }
});

// PUT api/todolist/complete/:id
// Complete a todolist
// Private
router.put('/complete/:id', auth, async (req,res) => {
  try {
    const todolist = await TodoList.findById(req.params.id);

    // Check if the todo has already been
    if (todolist.isCompleted) {
      return res.status(400).json({ msg: 'Todo List already completed' });
    }

    todolist.isCompleted = true;

    await todolist.save();

    res.json(todolist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//

module.exports = router;