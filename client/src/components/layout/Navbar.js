import React, { useState } from 'react'
import { Navbar, Button, Container, Nav, Modal, Form, Row, Col} from 'react-bootstrap';



const NavbarItem = () => {
  const [showregister, setShowRegister] = useState(false);
  const [showlogin, setShowLogin] = useState(false);

  const registerClose = () => setShowRegister(false);
  const registerShow = () => setShowRegister(true);

  const loginClose = () => setShowLogin(false);
  const loginShow = () => setShowLogin(true);
  return (
    <div>
      <Navbar className="color-nav" variant="light">
        <Container>
          <Navbar.Brand className="text-size" href="#home">To Do List</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link className="text-size">
              <Button variant="light" onClick={registerShow}>Sign Up</Button>
            </Nav.Link>
            <Nav.Link className="text-size">
              <Button variant="light" onClick={loginShow}>Login</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Modal className="modal" show={showregister} onHide={registerClose}>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Row>
              <Col>
                <Form.Control placeholder="First name" />
              </Col>
              <Col>
                <Form.Control placeholder="Last name" />
              </Col>
            </Row>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={registerClose}>
            Close
          </Button>
          <Button variant="primary" onClick={registerClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal className="modal" show={showlogin} onHide={loginClose}>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />

          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={loginClose}>
            Close
          </Button>
          <Button variant="primary" onClick={loginClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>

  )
}


export default NavbarItem
