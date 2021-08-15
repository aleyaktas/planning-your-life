import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const AddControl = ({onChange,todoClose,onClickAdd,showTodo, name}) => {
  return (
    <div>
      <Modal className="modal" show={showTodo} onHide={todoClose}>
        <Modal.Header>
          {name==="title" ? <Modal.Title>New Todo List</Modal.Title> : <Modal.Title>New Todo</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {name==="title" ? 
            <>
            <Form.Label>New Todo List Header</Form.Label>
            <Form.Control name={`${name}`} onChange={e => onChange(e)}  placeholder="Enter header" />
            </>
             : 
            <>
            <Form.Label>New Todo Task</Form.Label>
            <Form.Control name={`${name}`} onChange={e => onChange(e)}  placeholder="Enter task" />
            </>
            }
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={todoClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddControl
