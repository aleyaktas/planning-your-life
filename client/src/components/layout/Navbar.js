// import axios from 'axios';
import React, { useState, Fragment, useEffect } from 'react'
import { Navbar, Button, Container, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth'
import { login } from '../../actions/auth'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import { addTodoList, getTodoList } from '../../actions/todolist'
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import icon from '../../img/todo-icon-2.png'

const NavbarItem = ({ auth: {isAuthenticated, loading},todolist: {todolists}, getTodoList ,setAlert, register, login, logout, addTodoList}) => {

  let myDayId = todolists.filter((todolist) => todolist.title === "My Day")[0]?._id;

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
      
    await register({firstname, lastname, email, password})
    if(firstname && lastname && email && (password === confirmpassword)) {
      await addTodoList({title: "My Day"});
      await addTodoList({title: "Important"}) 
      await getTodoList();
    }
    
    myDayId = todolists.filter((todolist) => todolist.title === "My Day")[0]?._id;
      
      setFormRegister({
        firstname: '',
        lastname:'',
        email: '',
        password: '',
        confirmpassword: ''})
      registerClose();
    }
  }
  
  const onClickLogin = e => {
    const {login_email, login_password} = formLogin;
    login(login_email, login_password);
    setFormLogin({
      login_email: '',
      login_password: ''
    })
    getTodoList();
    
  }

  const onClickLogout = e => {
    e.preventDefault();
    logout();
    loginClose();
  }

  const guestLinks = (
    <div>
      <Navbar variant="light">
        <Container>
          <Navbar.Brand>
            <img className="todo-icon" src={icon} alt="" width="70" />
            <Navbar.Text className="text">Planning your life</Navbar.Text>
          </Navbar.Brand>
          <Nav>
            <Nav.Link>
              <Button className="navbar-button" variant="outline-warning" onClick={registerShow}>Sign Up</Button>
            </Nav.Link>
            <Nav.Link>
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
    <Navbar variant="light">
        <Navbar.Brand href="/todolist/1">
            <img src={icon} alt="" width="70" />
            <Navbar.Text className="text">Planning your life</Navbar.Text>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/todolist/1">
              <Button className="navbar-button" variant="outline-warning">Home</Button>
            </Nav.Link>
            <Nav.Link>
              <Button className="navbar-button" onClick={onClickLogout} variant="outline-warning" >Logout</Button>
            </Nav.Link>
          </Nav>
      </Navbar>
  );

  return (    
   <div>
     {!loading &&(
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
      {isAuthenticated ? 
        <Redirect to={`/todolist/${myDayId}`}/> : <Redirect to="/"/>
      }
   </div>
  )
}

NavbarItem.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getTodoList: PropTypes.func.isRequired,
  addTodoList: PropTypes.func.isRequired,
  todolist: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  todolist: state.todolist,
})

export default connect(mapStateToProps, { setAlert, register, login, logout, getTodoList, addTodoList }) (NavbarItem)
