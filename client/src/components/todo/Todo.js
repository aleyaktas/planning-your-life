import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { addTodo, deleteTodoById, completeTodo, editTodo } from '../../actions/todo'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { getAllTodo } from '../../actions/todo'
import { useState } from 'react'
import DeleteControl from '../modals/DeleteControl'
import AddControl from '../modals/AddControl'
import { FaRegTimesCircle, FaCheck, FaPencilAlt, FaRegSave } from 'react-icons/fa';
import useSound from 'use-sound';
import completeSound from '../../sounds/complete.mp3';
import addSound from '../../sounds/add.mp3';
import { Link } from 'react-router-dom'
import showNotice from '../../utils/showNotice'

const Todo = ({id, todos, todolist: {todolists}, getAllTodo, addTodo, deleteTodoById, completeTodo, editTodo, isDropDownBtn}) => {
  useEffect(() => {
    getAllTodo(id)
  }, [id])

  const [playComplete] = useSound(completeSound);
  const [playAdd] = useSound(addSound);

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
    playAdd();
  }

  // For complete todo func

  const [isComplete, setIsComplete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTodoId, setEditTodoId] = useState("");
  const [editTodoText, setEditTodoText] = useState("");

  const onClickComplete = (e, id) => {
    e.preventDefault();
    setIsComplete(!isComplete)
    completeTodo({id, isComplete});
    {!isComplete && playComplete() }
  }
  const onClickEdit = (e,id) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    setEditTodoId(id)
  }

  const onClickSave = (e,id) => {
    e.preventDefault();
    editTodo({id:editTodoId, text:editTodoText});
    setEditTodoText("");
    setTodoId("");
    setIsEdit(false);
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
    showNotice('😿 Todo removed', 'error')
  }

  return (
    <div>
      <Card.Title className = "todo-section" style={{marginTop: 10, padding: 15, borderRadius: 10, display: 'flex'}}>
        <Card.Text className="text">{id == "myday" ? "My day" : id == "important" ? "important" : todoListName}</Card.Text>
          <button id="button" className="list-button add-button" onClick={todoShow} variant= 'warning'>Add new todo +</button>
      </Card.Title>
        {todos.length>0 ? todos.map(todo => (
         <Card className = {`todo-section ${todo.isCompleted ? "bg-complete" : null}`} style= {{textAlign: "start", borderRadius: 15}}>
            <Card.Body className="body">
              {todo.isCompleted ===true ? 
              <Card.Text className="todo-text" style={{ textDecoration:"line-through"}}>
                {todo.text}
              </Card.Text> 
                : 
              <Card.Text className={`todo-text ${(isEdit === true && editTodoId===todo._id) ? "todo-border" : null}`} contentEditable= {(isEdit === true && editTodoId===todo._id) ? "true" : "false"} onInput={(e) => setEditTodoText(e.target.innerText)}>
                {todo.text}
              </Card.Text>}
              
              <div className="todo-button-style">
              {(isEdit === true && editTodoId === todo._id && todo.isCompleted === false ? 
                <Button onClick={(e) => onClickSave(e, editTodoId)} variant="light" className="save-button" >                
                  <FaRegSave size={20} color="#A25016" />
                </Button> : null)}
                <Button onClick={(e) => onClickEdit(e, todo._id)} variant="light" className="btn-mg edit-button">
                    <FaPencilAlt size={20} color="#F48924"/>
                </Button>  
                <Button onClick={(e) => onClickComplete(e,todo._id)} variant="light" className="btn-mg complete-button">
                    <FaCheck size={20} color="#5ECC62"/>
                </Button>       
                <Button onClick={() => controlShow(todo._id)} variant="light" className="btn-mg delete-button">
                    <FaRegTimesCircle size={20} color="#FF0033"/>
                </Button>
              </div>
            </Card.Body>
          </Card>))
            : 
          (<Card className = {`todo-section`} style= {{width: "fit-content", borderRadius: "50%",margin: 20,padding: 20}}>
            <Card.Body className="body-item">           
              <Card.Text className="text-item">
                You haven't any todo.
                <Link style={{display:"block"}} onClick={todoShow}> Are you want add new todo task?</Link>
              </Card.Text>            
              <Card.Text className={`todo-text`}>      
              </Card.Text>
            </Card.Body>
          </Card>)
        }
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
  completeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  isDropDownBtn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  todos: state.todo.todos,
  todolist: state.todolist,
  isDropDownBtn: state.todolist.isDropDownBtn
})

export default connect(mapStateToProps, {addTodo, getAllTodo, deleteTodoById, completeTodo, editTodo}) (Todo)
