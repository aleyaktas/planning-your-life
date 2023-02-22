import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

const RegisterModal = ({
  showregister,
  registerClose,
  onChangeRegister,
  onClickRegister,
  registerData,
}) => {
  const onKeyPress = async (e) => {
    e.key === "Enter" && (await onClickRegister());
  };
  return (
    <div>
      <Modal className="modal" show={showregister} onHide={registerClose}>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="">
              <Row>
                <Col>
                  <Form.Control
                    className="modal-form-text"
                    value={registerData.firstname}
                    name="firstname"
                    placeholder="First name"
                    onChange={(e) => onChangeRegister(e)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    className="modal-form-text"
                    value={registerData.lastname}
                    name="lastname"
                    placeholder="Last name"
                    onChange={(e) => onChangeRegister(e)}
                  />
                </Col>
              </Row>
              <Form.Control
                className="modal-form-text mb-4 "
                value={registerData.email}
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={(e) => onChangeRegister(e)}
              />
            </Form.Group>
            <Form.Group className="mt-2 mb-2" controlId="formBasicPassword">
              <Form.Control
                className="mb-4 modal-form-text"
                value={registerData.password}
                name="password"
                type="password"
                minLength="6"
                placeholder="Password"
                onChange={(e) => onChangeRegister(e)}
              />
              <Form.Control
                className="modal-form-text"
                value={registerData.confirmpassword}
                name="confirmpassword"
                type="password"
                minLength="6"
                placeholder="Confirm Password"
                onChange={(e) => onChangeRegister(e)}
                onKeyPress={(e) => onKeyPress(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="modal-button modal-close-button"
            variant="secondary"
            onClick={registerClose}
          >
            Close
          </Button>
          <Button
            className="modal-button navbar-button"
            variant="warning"
            onClick={onClickRegister}
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterModal;
