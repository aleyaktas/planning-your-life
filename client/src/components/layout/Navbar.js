// import axios from 'axios';
import React, { useState, Fragment } from 'react'
import { Navbar, Button, Container, Nav, Modal, Form, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth'
import { login } from '../../actions/auth'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'

const NavbarItem = ({ auth: {isAuthenticated, loading}, setAlert, register, login, logout}) => {
 
  const [showregister, setShowRegister] = useState(false);
  const [showlogin, setShowLogin] = useState(false);
  const [formRegister, setFormRegister] = useState({
    firstname: '',
    lastname:'',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const [formLogin, setFormLogin] = useState({
    login_email: '',
    login_password: ''
  });

  const registerClose = () => setShowRegister(false);
  const registerShow = () => setShowRegister(true);
  const loginClose = () => setShowLogin(false);
  const loginShow = () => setShowLogin(true);

  const { firstname, lastname, email, password, confirmpassword } = setFormRegister;
  const { login_email, login_password } = setFormLogin;

  const onChangeRegister = e => setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  const onChangeLogin = e => setFormLogin({ ...formLogin, [e.target.name]: e.target.value });

  const onClickRegister = async e => {
    e.preventDefault();
    const {firstname, lastname, email, password, confirmpassword} = formRegister;
    if (password !== confirmpassword) {
      setAlert('Passwords do not match')
    } else {
      register({firstname, lastname, email, password})
    }
  }
  const onClickLogin = e => {
    const {login_email, login_password} = formLogin;

    login(login_email, login_password)
  }

  const modal = 
    <div>
      <Modal className="modal" show={showregister} onHide={registerClose}>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4 mt-2" >
              <Row>
                <Col>
                  <Form.Control className="mb-4" value={firstname} name="firstname" placeholder="First name"  onChange={e => onChangeRegister(e)}  />  
                </Col>
                <Col>
                  <Form.Control value={lastname}  name="lastname" placeholder="Last name"  onChange={e => onChangeRegister(e)}  />
                </Col>
              </Row>
              <Form.Control value={email}  name="email" type="email" placeholder="Enter email" onChange={e => onChangeRegister(e)} />
            </Form.Group>
            <Form.Group className="mt-2 mb-2" controlId="formBasicPassword">
              <Form.Control className="mb-4" value={password} name="password"  type="password"minLength="6"placeholder="Password" onChange={e => onChangeRegister(e)} />
              <Form.Control value={confirmpassword}  name="confirmpassword" type="password"minLength="6"placeholder="Confirm Password" onChange={e => onChangeRegister(e)} />
            </Form.Group>  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={registerClose}>Close</Button>
          <Button  variant="primary" onClick={onClickRegister}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <Modal className="modal" show={showlogin} onHide={loginClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="m-2 mb-4" controlId="formBasicEmail">
              <Form.Control value={login_email} name="login_email" type="email" placeholder="Enter email" onChange={e => onChangeLogin(e)}  />
            </Form.Group>
            <Form.Group className="m-2" controlId="formBasicPassword">
              <Form.Control value={login_password} name="login_password" type="password" placeholder="Password" onChange={e => onChangeLogin(e)}  />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={loginClose}>Close</Button>
          <Button variant="primary" onClick={onClickLogin}>Login</Button>
          <Button variant="light" onClick={registerShow}>Don't have an account?</Button>
        </Modal.Footer>
      </Modal>
      </div>

  const guestLinks = (
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
      {modal}      
    </div>
  );

  const authLinks = (
    <Navbar className="color-nav" variant="light">
        <Container>
          <Navbar.Brand className="text-size" href="#home">To Do List</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link className="text-size">
              <Button variant="light">Home</Button>
            </Nav.Link>
            <Nav.Link className="text-size">
              <Button onClick={logout} variant="light" >Logout</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );


  return (    
   <div>
     {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
   </div>
  )
    }

NavbarItem.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { setAlert, register, login, logout }) (NavbarItem)
