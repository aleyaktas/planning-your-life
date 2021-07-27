import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import  PropTypes  from 'prop-types'
import {Col, Row, ListGroup, Button, Modal, Form} from 'react-bootstrap'
import { addTodoList, getTodoList } from '../../actions/todolist'
import todolist from '../../reducers/todolist'

const Home = ({auth: {user}, getTodoList, todolist: {todolists}, addTodoList}) => {

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

  const onClick = e => {
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
          <Button variant="primary" onClick={onClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  return (
    <Fragment>
      <section className="home">
        <div className="dark-overlay"> 
          <Row className="m-0 position-home">
          <Col xs={2} className="p-0 border-col">
          <ListGroup variant="flush">
            <div className="list-group-ite">My Day</div>
            <div className="list-group-ite">Important</div>
            {todolists && todolists.map(todolist => <div  className="list-group-ite">{todolist.title}</div>)}
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
  getTodoList: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  todolist: state.todolist
})


export default connect(mapStateToProps, { addTodoList,getTodoList }) (Home)
