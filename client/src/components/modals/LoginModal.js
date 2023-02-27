import React, { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ShowMessage from "../../utils/ShowMessage";

const LoginModal = ({
  onChangeLogin,
  showlogin,
  loginClose,
  onClickLogin,
  registerShow,
  loginData,
  forgotModalShow,
  authError,
}) => {
  return (
    <div>
      <Modal className="modal" show={showlogin} onHide={loginClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="login-modal-body">
          <Form>
            {authError.isAvailable && (
              <ShowMessage errorMsg={authError.errorMsg} />
            )}
            <Form.Group className="m-2 mb-4 " controlId="formBasicEmail">
              <Form.Control
                className="modal-form-text"
                value={loginData.login_email}
                name="login_email"
                type="email"
                placeholder="Enter email"
                onChange={(e) => onChangeLogin(e)}
              />
            </Form.Group>
            <Form.Group className="m-2" controlId="formBasicPassword">
              <Form.Control
                className="modal-form-text"
                value={loginData.login_password}
                name="login_password"
                type="password"
                placeholder="Password"
                onChange={(e) => onChangeLogin(e)}
                onKeyPress={(e) => {
                  e.key === "Enter" && onClickLogin();
                }}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                style={{ color: "#000000a6" }}
                className="modal-button modal-control-button"
                variant="light"
                onClick={(e) => {
                  forgotModalShow();
                  loginClose();
                }}
              >
                Forgot your password?
              </Button>
              <div>
                <Button
                  style={{ marginRight: 2 }}
                  className="modal-button modal-close-button"
                  variant="secondary"
                  onClick={loginClose}
                >
                  Close
                </Button>
                <Button
                  className="modal-button navbar-button"
                  onClick={onClickLogin}
                >
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            textDecoration: "none",
            alignSelf: "center",
            padding: 0,
          }}
        >
          <Button
            style={{}}
            className="modal-button modal-control-button"
            variant="light"
            onClick={registerShow}
          >
            Don't have an account?
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginModal;
