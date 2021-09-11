import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const ResetPassword = ({showModal, modalClose, onClickChangePassword, onChange}) => {

  const handleKeypress = e => {
    if (e.key === "Enter") {
      onClickChangePassword();
      e.preventDefault();
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={modalClose}>
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group type="text" className="mb-3" >
            <Form.Control type="password" onKeyDown={e => handleKeypress(e)} className="modal-form-text" onChange={e => onChange(e)}  placeholder={"Enter new password"}
             />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-button modal-close-button" variant="secondary" onClick={modalClose}>
            Close
          </Button>
          <Button className="modal-button modal-save-button" variant="warning" onClick={onClickChangePassword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ResetPassword
