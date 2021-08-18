// import axios from 'axios';
import React, { useState, Fragment } from 'react'
import { Navbar, Button, Container, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth'
import { login } from '../../actions/auth'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import { getTodoList } from '../../actions/todolist'
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';

const NavbarItem = ({ auth: {isAuthenticated, loading}, getTodoList ,setAlert, register, login, logout}) => {

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
  const registerShow = () => {
    setShowRegister(true);
    loginClose(); 
  };
  const loginClose = () => setShowLogin(false);
  const loginShow = () => setShowLogin(true);

  const onChangeRegister = e => setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  const onChangeLogin = e => setFormLogin({ ...formLogin, [e.target.name]: e.target.value });

  const onClickRegister = async e => {
    e.preventDefault();
    const {firstname, lastname, email, password, confirmpassword} = formRegister;
    if (password !== confirmpassword) {
      setAlert('Passwords do not match','danger')
    } else {
      register({firstname, lastname, email, password})
    }
  }
  
  const onClickLogin = e => {
    const {login_email, login_password} = formLogin;
    login(login_email, login_password)
    getTodoList();
  }

  const guestLinks = (
    <div>
      <Navbar className="color-nav p-0" variant="light">
        <Container>
          <Navbar.Brand className="text-size" href="#home">To Do List</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link className="text-size">
              <Button className="navbar-button" variant="outline-warning" onClick={registerShow}>Sign Up</Button>
            </Nav.Link>
            <Nav.Link className="text-size">
              <Button className="navbar-button" variant="outline-warning" onClick={loginShow}>Login</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <LoginModal onChangeLogin={onChangeLogin} showlogin={showlogin} loginClose={loginClose} onClickLogin={onClickLogin} registerShow={registerShow} loginData={formLogin} />
      <RegisterModal showregister={showregister} registerClose={registerClose} onChangeRegister={onChangeRegister} registerData={formRegister} onClickRegister={onClickRegister}/>
    </div>
  );

  const authLinks = (
    <Navbar className="navbar p-0" variant="light">
        <Container>
          <Navbar.Brand className="text-size" href="/todolist/1">To Do List</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/todolist/1" className="text-size">
              <Button className="navbar-button" variant="outline-warning">Home</Button>
            </Nav.Link>
            <Nav.Link className="text-size">
              <Button className="navbar-button" onClick={logout} variant="outline-warning" >Logout</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
  );

  return (    
   <div>
     {!loading &&(
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
      {isAuthenticated ? 
        <Redirect to="/todolist/myday"/> : <Redirect to="/"/>
      }
   </div>
  )
    }

NavbarItem.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getTodoList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { setAlert, register, login, logout, getTodoList }) (NavbarItem)
