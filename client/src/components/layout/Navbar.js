// import axios from 'axios';
import React, { useState } from 'react'
import { Navbar, Button, Container, Nav, Modal, Form, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';


const NavbarItem = ({ setAlert, register, login, isAuthenticated }) => {
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
      // console.log('Passwords do not match')
      setAlert('Passwords do not match')
    } else {
      // console.log('SUCCESS') 
      register({firstname, lastname, email, password})
    }
  }
  const onClickLogin = e => {
    const {login_email, login_password} = formLogin;
    // console.log('SUCCESS LOGIN')
    login(login_email, login_password)
  }

  if(isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

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
          <Form.Group className="mb-3" >
            <Row>
              <Col>
                <Form.Control 
                  value={firstname} 
                  name="firstname" 
                  placeholder="First name"  
                  onChange={e => onChangeRegister(e)}  />
                  
              </Col>
              <Col>
                <Form.Control 
                  value={lastname}  
                  name="lastname" 
                  placeholder="Last name"  
                  onChange={e => onChangeRegister(e)}  />
              </Col>
            </Row>
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              value={email}  
              name="email" 
              type="email" 
              placeholder="Enter email" 
              onChange={e => onChangeRegister(e)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              value={password} 
              name="password"  
              type="password"
              minLength="6"
              placeholder="Password" 
              onChange={e => onChangeRegister(e)} />
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              value={confirmpassword}  
              name="confirmpassword" 
              type="password"
              minLength="6"
              placeholder="Confirm Password" 
              onChange={e => onChangeRegister(e)} />
          </Form.Group>
          
          
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={registerClose}>
            Close
          </Button>
          <Button  variant="primary" onClick={onClickRegister}>
            Save Changes
          </Button>
        </Modal.Footer>
       
          
    
      </Modal>
      <Modal className="modal" show={showlogin} onHide={loginClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              value={login_email} 
              name="login_email" 
              type="email" 
              placeholder="Enter email" 
              onChange={e => onChangeLogin(e)}  />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              value={login_password} 
              name="login_password" 
              type="password" 
              placeholder="Password" 
              onChange={e => onChangeLogin(e)}  />

          </Form.Group>
          <Button variant="secondary" onClick={loginClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickLogin}>
            Login
          </Button>
          
              <Button variant="light" onClick={registerShow}>Don't have an account?</Button>
            
        </Form>
        </Modal.Body>
      </Modal>
      
    </div>

  )
}

NavbarItem.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register, login }) (NavbarItem)
