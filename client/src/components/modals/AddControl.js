import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const AddControl = ({onChange,todoClose,onClickAdd,showTodo, name}) => {

  const handleKeypress = e => {
    if (e.key === "Enter") {
      console.log('do validate')
      onClickAdd();
      e.preventDefault();
    }
  };
  return (
    <div>
      <Modal show={showTodo} onHide={todoClose}>
        <Modal.Header>
          {name==="title" ? <Modal.Title>New Todo List</Modal.Title> : <Modal.Title>New Todo</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group type="text" className="mb-3" >
            <Form.Control  onKeyDown={e => handleKeypress(e) } className="modal-form-text" onChange={e => onChange(e)}  placeholder={name==="title" ? "Enter header" : "Enter task"}
             />
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
