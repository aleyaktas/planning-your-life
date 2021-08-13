import React, { Fragment, useState, useEffect, Component } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import { connect } from 'react-redux'
import  PropTypes  from 'prop-types'
import {Col, Row, ListGroup, Button, Modal, Form} from 'react-bootstrap'
import { addTodoList, getTodoList, deleteTodoList } from '../../actions/todolist'
import { Link } from 'react-router-dom';

const Sidebar = ({auth: {user}, getTodoList, todolist: {todolists}, addTodoList, deleteTodoList}) => {

  useEffect(() => {
    getTodoList()
  }, [])

  const [todoListId, setTodoListId] = useState("");
  const [showtodolist, setShowTodoList] = useState(false);
  const [showcontrol, setShowControl] = useState(false);
  const [formList, setFormList] = useState({
    title: ''
  });

  const todolistClose = () => setShowTodoList(false);
  const todolistShow = () => setShowTodoList(true);
  const controlShow = (id) => {setShowControl(true)
    setTodoListId(id)
  };
  const modalClose = () => {setShowControl(false)
    setTodoListId("");
  };

  const onChange = e => setFormList({ ...formList, [e.target.name]: e.target.value });

  const onClickAdd = e => {
    e.preventDefault();
    const {title} = formList;
    addTodoList({title})
    todolistClose();
  }

const modalTodoListForm = 
    <div>
      <Modal className="modal" show={showtodolist} onHide={todolistClose}>
        <Modal.Header>
          <Modal.Title>New Todo List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>New Todo List Header</Form.Label>
            <Form.Control name="title" onChange={e => onChange(e)}  placeholder="Enter header" />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={todolistClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    const modalControl = 
    <div>
      <Modal className="modal" show={showcontrol} onHide={modalClose}>
        <Modal.Header>
          <Modal.Title>Are you sure you want to delete this todo list?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {deleteTodoList(todoListId)
          modalClose()}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  return (
    <Fragment>
      <div className="home">
        <div className="overlay"> 
          <Row className="m-0 position-home"> 
          <Col  className="p-0 border-col">
          <ListGroup variant="flush">
            <Link to={'/todolist/myday'} className="list-group-items">
              My Day
            </Link>
            <Link to={'/todolist/important'} className="list-group-items">
              Important
            </Link>
            {todolists && todolists.map(todolist => 
            <Link to={`/todolist/${todolist._id}`} className="list-group-items">{todolist.title}
            <Button onClick={() => controlShow(todolist._id)} variant="outline-warning" className="float-right btn-sm">
                <i className="bi bi-x-circle"></i>
            </Button>
            </Link>)}
            <Button onClick={todolistShow} variant="light">New Todo List +</Button>
          </ListGroup>
           </Col> 
            {modalTodoListForm}
            {modalControl}
           {/* <Col>
          <h1 className="center" >Welcome {user && user.firstname}</h1>
          <p></p>
          {modalTodoListForm}
          {modalControl}
          </Col>  */}
         </Row> 
        </div>
      </div>
    </Fragment>
  )
}
Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  addTodoList: PropTypes.func.isRequired,
  getTodoList: PropTypes.func.isRequired,
  deleteTodoList: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  todolist: state.todolist
})


export default connect(mapStateToProps, { addTodoList,getTodoList, deleteTodoList }) (Sidebar)
