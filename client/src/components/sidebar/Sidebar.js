import React, { Fragment, useState, useEffect, Component } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from 'react-redux'
import  PropTypes  from 'prop-types'
import {Col, Row, ListGroup, Button } from 'react-bootstrap'
import { addTodoList, getTodoList, deleteTodoList } from '../../actions/todolist'
import { deleteTodoById } from '../../actions/todo'
import DeleteControl from '../modals/DeleteControl';
import AddControl from '../modals/AddControl';
import { FaRegTimesCircle } from 'react-icons/fa';

const Sidebar = ({ getTodoList, todolist: {todolists}, addTodoList, deleteTodoList, todo: {todos}, deleteTodoById, history}) => {

  useEffect(() => {
    getTodoList()
  }, [])

  // For add todo list modal
  const [todoListId, setTodoListId] = useState("");
  const [showTodo, setShowTodo] = useState(false);
  const [formList, setFormList] = useState({
    title: ''
  });
  const todoClose = () => setShowTodo(false);
  const todoShow = () => setShowTodo(true);

  const onChange = e => setFormList({ ...formList, [e.target.name]: e.target.value });

  const onClickAdd = e => {
    e.preventDefault();
    const {title} = formList;
    addTodoList({title});
    todoClose();
    history.push('/myday')
  }

  // For delete control modal
  const [showcontrol, setShowControl] = useState(false);
  const controlShow = (id) => {setShowControl(true)
    setTodoListId(id)
  };
  const modalClose = () => {setShowControl(false)
    setTodoListId("");
  };

  const onClickDelete = e => {
    e.preventDefault();
    deleteTodoList(todoListId) 
    history.push('/todolist/myday')
    const id = todos.filter((item) => item.todoList == todoListId)
    id.map(item => deleteTodoById(item._id))
    modalClose()
  }

  return (
    <Fragment>
      <div className="home">
        <div className="overlay"> 
          <Row className="position-home"> 
          <Col  className="border-col">
          <ListGroup variant="flush">
            <button id="button" onClick={() => history.push('/todolist/myday')} className="style-5">
              My Day
            </button>
            <button id="button" onClick={() => history.push('/todolist/important')} className="style-5">
              Important
            </button>
            {todolists && todolists.map(todolist => 
            <button id="button" onClick={() => history.push(`/todolist/${todolist._id}`)} className="style-5">{todolist.title}
            <Button onClick={() => controlShow(todolist._id)} variant="light" className="float-right btn-sm">
              <FaRegTimesCircle size={18} color="#FF0033"/>
            </Button>
            </button>)}
            <button id="button" className="style-5" style={{backgroundColor: "pink"}} onClick={todoShow} variant="light">New Todo List +</button>
          </ListGroup>
           </Col> 
            <AddControl onChange={onChange} todoClose={todoClose} onClickAdd={onClickAdd} showTodo={showTodo} name="title" />
            <DeleteControl showcontrol={showcontrol} onClickDelete={onClickDelete} modalClose={modalClose} name="title"/>
         </Row> 
        </div>
      </div>
    </Fragment>
  )
}

Sidebar.propTypes = {
  addTodoList: PropTypes.func.isRequired,
  getTodoList: PropTypes.func.isRequired,
  deleteTodoList: PropTypes.func.isRequired,
  deleteTodoById: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  todolist: state.todolist,
  todo: state.todo
})

export default connect(mapStateToProps, { addTodoList,getTodoList, deleteTodoList, deleteTodoById }) (Sidebar)
