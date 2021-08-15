import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { addTodo, deleteTodoById } from '../../actions/todo'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { getAllTodo } from '../../actions/todo'
import { useState } from 'react'
import {Modal, Form} from 'react-bootstrap'
import DeleteControl from '../modals/DeleteControl'
import AddControl from '../modals/AddControl'

const Todo = ({id, todo: {todos}, todolist: {todolists}, getAllTodo, addTodo, deleteTodoById}) => {
  useEffect(() => {
    getAllTodo()
  }, [])

  // For add todo 
  const [todoId, setTodoId] = useState("");
  const [showTodo, setShowTodo] = useState(false);
  const [formList, setFormList] = useState({
    text: ''
  });
  const todoClose = () => setShowTodo(false);
  const todoShow = () => setShowTodo(true);

  const todoListName = todolists.filter((item) => item._id === id)[0]?.title;

  const onChange = e => setFormList({ ...formList, [e.target.name]: e.target.value });

  const onClickAdd = e => {
    e.preventDefault();
    const {text} = formList;
    addTodo({text, todoList: id})
    todoClose();
  }

  // For delete todo
  const [showcontrol, setShowControl] = useState(false);
  const controlShow = (id) => {setShowControl(true)
    setTodoId(id)
  };
  const modalClose = () => {setShowControl(false)
    setTodoId("");
  };

  const onClickDelete = e => {
    e.preventDefault();
    deleteTodoById(todoId)
    modalClose()
  }

  return (
    <div>
      <Card.Title className = "todo-section" style={{marginTop: 10, padding: 15}}>
        {id == "myday" ? "My day" : id == "important" ? "important" : todoListName} 
        <button id="button" className="style-5" onClick={todoShow} variant= 'warning' style = {{marginLeft: 30, color: 'black', width: "20%", fontSize: 17, padding: 4, backgroundColor: "pink"}}>Add new todo +</button>
      </Card.Title>
        {todos && todos.map(todo => {
        return todo.todoList == id ?  
            <Card className = "todo-section" style= {{textAlign: "start", borderRadius: 15}}>
                <Card.Body style={{padding: "0.5rem 1rem", display:"flex"}}>
                  <Card.Text style={{display:'inline-block', margin: 0, justifyContent:"center", alignSelf:"center"}}>
                    {todo.text}
                  </Card.Text>
                  <Button onClick={() => controlShow(todo._id)} variant="light" style={{marginLeft:"auto"}} className="btn-mg">
                      <i className="bi bi-x-circle"></i>
                  </Button>
                </Card.Body>
            </Card> 
            :  ''
        }
        )}
        <AddControl onChange={onChange} todoClose={todoClose} onClickAdd={onClickAdd} showTodo={showTodo} name="text"/>
        <DeleteControl showcontrol={showcontrol} onClickDelete={onClickDelete} modalClose={modalClose} name="text" />
    </div>
  )
}

Todo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  getAllTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
  todolist: PropTypes.object.isRequired,
  deleteTodoById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  todo: state.todo,
  todolist: state.todolist
})

export default connect(mapStateToProps, {addTodo, getAllTodo, deleteTodoById}) (Todo)
