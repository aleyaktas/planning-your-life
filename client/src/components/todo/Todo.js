import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../../actions/todo'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { getAllTodo } from '../../actions/todo'
import { useState } from 'react'
import {Modal, Form} from 'react-bootstrap'

const Todo = ({id, todo: {todos}, todolist: {todolists}, getAllTodo, addTodo}) => {
  useEffect(() => {
    getAllTodo()
  }, [])

  const [showModal, setShowModal] = useState(false);
  const [formList, setFormList] = useState({
    text: ''
  });

  const todoAddClose = () => setShowModal(false);
  const todoAddShow = () => setShowModal(true);

  const todoListName = todolists.filter((item) => item._id === id)[0]?.title;

  const onChange = e => setFormList({ ...formList, [e.target.name]: e.target.value });

  const onClickAdd = e => {
    e.preventDefault();
    const {text} = formList;
    addTodo({text, todoList: id})
    todoAddClose();
  }

  const modal = 
  <div>
    <Modal className="modal" show={showModal} onHide={todoAddClose}>
      <Modal.Header>
        <Modal.Title>New Todo Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>New Todo Task</Form.Label>
          <Form.Control name="text" onChange={e => onChange(e)}  placeholder="Enter header" />
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={todoAddClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClickAdd}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
</div>

  return (
    <div>
      <Card.Title className = "todo-section" style={{marginTop: 10, padding: 15}}>
        {id == "myday" ? "My day" : id == "important" ? "important" : todoListName} 
        <Button onClick={todoAddShow} variant= 'warning' style = {{marginLeft: 25, color: 'white'}}>Add new todo +</Button>
      </Card.Title>
        {todos && todos.map(todo => {
        return todo.todoList == id ? 
            <Card className = "todo-section" style= {{textAlign: "start"}}>
                <Card.Body>
                  <Card.Text>
                    {todo.text}
                  </Card.Text>
                </Card.Body>
            </Card> 
            :  ''
        }
        )}
        {modal}
    </div>
    
  )
}

Todo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  getAllTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
  todolist: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todo: state.todo,
  todolist: state.todolist
})

export default connect(mapStateToProps, {addTodo, getAllTodo}) (Todo)
