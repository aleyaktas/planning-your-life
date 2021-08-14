const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  todoList: {
    type: Schema.Types.ObjectId,
    ref: 'todoList'
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type:Boolean,
    default: false
  }
})

module.exports = Todo = mongoose.model('todo', TodoSchema)