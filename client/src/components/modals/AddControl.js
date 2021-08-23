import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const AddControl = ({onChange,todoClose,onClickAdd,showTodo, name}) => {
  return (
    <div>
      <Modal show={showTodo} onHide={todoClose}>
        <Modal.Header>
          {name==="title" ? <Modal.Title>New Todo List</Modal.Title> : <Modal.Title>New Todo</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control className="modal-form-text" name={`${name}`} onChange={e => onChange(e)}  placeholder={name==="title" ? "Enter header" : "Enter task"} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-button modal-close-button" variant="secondary" onClick={todoClose}>
            Close
          </Button>
          <Button className="modal-button modal-save-button" variant="warning" onClick={onClickAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddControl
