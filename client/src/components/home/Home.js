import React, { Fragment, useState, useEffect } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";

import { connect } from 'react-redux'
import  PropTypes  from 'prop-types'
import {Col, Row, ListGroup, Button, Modal, Form} from 'react-bootstrap'
import { addTodoList, getTodoList, deleteTodoList } from '../../actions/todolist'

const Home = ({auth: {user}, getTodoList, todolist: {todolists}, addTodoList, deleteTodoList}) => {

  useEffect(() => {
    getTodoList()
  }, [])

  const [showtodolist, setShowTodoList] = useState(false);
  const [formList, setFormList] = useState({
    title: ''
  });

  const todolistClose = () => setShowTodoList(false);
  const todolistShow = () => setShowTodoList(true);

  const onChange = e => setFormList({ ...formList, [e.target.name]: e.target.value });

  const onClickAdd = e => {
    e.preventDefault();
    const {title} = formList;
    addTodoList({title})
    todolistClose();
  }

const modal = 

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

  return (
    <Fragment>
      <section className="home">
        <div className="overlay"> 
          <Row className="m-0 position-home">
          <Col xs={2} className="p-0 border-col">
          <ListGroup variant="flush">
            <div className="list-group-items">
              My Day
              <Button variant="outline-warning" className="float-right btn-sm">
                <i className="bi bi-x-circle"></i>
              </Button>
            </div>
            <div className="list-group-items">Important
              <Button variant="outline-warning" className="float-right btn-sm">
                <i className="bi bi-x-circle"></i>
              </Button>
            </div>
            {todolists && todolists.map(todolist => 
            <div  className="list-group-items">{todolist.title}
            <Button onClick={() => deleteTodoList(todolist._id)} variant="outline-warning" className="float-right btn-sm">
                <i className="bi bi-x-circle"></i>
            </Button>
            </div>)}
            <Button onClick={todolistShow} variant="light">New Todo List +</Button>
          </ListGroup>
          </Col>
          <Col>
          <h1 className="center" >Welcome {user && user.firstname}</h1>      
          {modal}
          </Col>
        </Row>
        </div>
      </section>
    </Fragment>
  )
}
Home.propTypes = {
  auth: PropTypes.object.isRequired,
  addTodoList: PropTypes.func.isRequired,
  getTodoList: PropTypes.func.isRequired,
  deleteTodoList: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  todolist: state.todolist
})


export default connect(mapStateToProps, { addTodoList,getTodoList, deleteTodoList }) (Home)
