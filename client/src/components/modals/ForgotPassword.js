import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const ForgotPassword = ({showForgotModal, forgotModalClose, onClickForgot, onChangeForgot}) => {

  const handleKeypress = e => {
    if (e.key === "Enter") {
      onClickForgot();
      e.preventDefault();
    }
  };

  return (
    <div>
      <Modal show={showForgotModal} onHide={forgotModalClose}>
        <Modal.Header>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group type="text" className="mb-3" >
            <Form.Control type="email" onKeyDown={e => handleKeypress(e)} className="modal-form-text" onChange={e => onChangeForgot(e)}  placeholder={"Enter email"}
             />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-button modal-close-button" variant="secondary" onClick={forgotModalClose}>
            Close
          </Button>
          <Button className="modal-button modal-save-button" variant="warning" onClick={onClickForgot}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ForgotPassword
