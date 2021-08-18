import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap';

const LoginModal = ({onChangeLogin,showlogin,loginClose, onClickLogin, registerShow, loginData}) => {
  return (
    <div>
      <Modal className="modal" show={showlogin} onHide={loginClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="m-2 mb-4 " controlId="formBasicEmail">
              <Form.Control className="modal-form-text" value={loginData.login_email} name="login_email" type="email" placeholder="Enter email" onChange={e => onChangeLogin(e)}  />
            </Form.Group>
            <Form.Group className="m-2" controlId="formBasicPassword">
              <Form.Control className="modal-form-text" value={loginData.login_password} name="login_password" type="password" placeholder="Password" onChange={e => onChangeLogin(e)}  />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-button modal-close-button" variant="secondary" onClick={loginClose}>Close</Button>
          <Button className="modal-button modal-save-button" variant="warning" onClick={onClickLogin}>Login</Button>
          <Button className="modal-button modal-control-button" variant="light" onClick={registerShow}>Don't have an account?</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LoginModal
