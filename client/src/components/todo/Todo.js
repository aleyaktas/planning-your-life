import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { addTodo, deleteTodoById, completeTodo } from '../../actions/todo'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { getAllTodo } from '../../actions/todo'
import { useState } from 'react'
import DeleteControl from '../modals/DeleteControl'
import AddControl from '../modals/AddControl'
import { FaRegTimesCircle, FaCheck } from 'react-icons/fa';

const Todo = ({id, todo: {todos}, todolist: {todolists}, getAllTodo, addTodo, deleteTodoById, completeTodo}) => {
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

  // For complete todo func

  const [isComplete, setIsComplete] = useState("false");

  
  const onClickComplete = (e, id) => {
    e.preventDefault();
    setIsComplete(!isComplete)
    completeTodo({id, isComplete})};

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
          <Card className = {`todo-section ${todo.isCompleted ? "bg-complete" : null}`} style= {{textAlign: "start", borderRadius: 15}}>
            <Card.Body style={{padding: "0.5rem 1rem", display:"flex "}}>
              {todo.isCompleted ===true ? 
              <Card.Text  className="todo-text" style={{ textDecoration:"line-through"}}>
                {todo.text}
              </Card.Text> 
                : 
              <Card.Text className="todo-text">
                {todo.text}
              </Card.Text>}
                  
              <div style={{marginLeft:"auto"}}>
              <Button onClick={(e) => onClickComplete(e,todo._id)} variant="light" className="btn-mg complete-button">
                  <FaCheck size={22} color="#5ECC62"/>
              </Button>       
              <Button onClick={() => controlShow(todo._id)} variant="light" style={{marginLeft:"auto"}} className="btn-mg delete-button">
                  <FaRegTimesCircle size={22} color="#FF0033"/>
              </Button>
              </div>
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
  deleteTodoById: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  todo: state.todo,
  todolist: state.todolist
})

export default connect(mapStateToProps, {addTodo, getAllTodo, deleteTodoById, completeTodo}) (Todo)
