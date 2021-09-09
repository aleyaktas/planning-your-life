// import axios from 'axios';
import React, { useState, Fragment } from 'react'
import { Navbar, Button, Container, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth'
import { login } from '../../actions/auth'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'
import { addTodoList, getTodoList } from '../../actions/todolist'
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import icon from '../../img/todo-icon-2.png'
import iconGithub from '../../img/github-icon.png'
import iconLinkedin from '../../img/linkedin-icon.png'
import { useHistory } from 'react-router-dom';

const NavbarItem = ({ auth: {isAuthenticated, loading},todolist: {todolists}, getTodoList ,setAlert, register, login, logout, addTodoList}) => {

  let myDayId = todolists.filter((todolist) => todolist.title === "My Day")[0]?._id;
  let history = useHistory();
  
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
    const {firstname, lastname, email, password, confirmpassword} = formRegister;
    if (password !== confirmpassword) {
      setAlert('Passwords do not match','danger')
    } else {
      
    await register({firstname, lastname, email, password})
    if(firstname && lastname && email && (password === confirmpassword)) {
      myDayId = await addTodoList({title: "My Day"});
      console.log(myDayId)
      await addTodoList({title: "Important"}) 
      // await getTodoList();
    }
    history.push(`/todolist/${myDayId}`)  
      setFormRegister({
        firstname: '',
        lastname:'',
        email: '',
        password: '',
        confirmpassword: ''})
      registerClose();
    }
  }
  
  const onClickLogin = async e => {
    const {login_email, login_password} = formLogin;
    await login(login_email, login_password);
    setFormLogin({
      login_email: '',
      login_password: ''
    })
    myDayId = await getTodoList();
    history.push(`/todolist/${myDayId}`)
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
            <img className="todo-icon" src={icon} alt="" width="60" />
            <Navbar.Text className="text">Planning your life</Navbar.Text>
          </Navbar.Brand>
          <div> 
            <Nav.Link style={{display: 'inline-block', padding:0, paddingRight: 1}} href={'https://github.com/aleyaktas'} >
              <img src={iconGithub} alt="" width="40" />
            </Nav.Link>
            <Nav.Link style={{display: 'inline-block', padding:0}} href={'https://www.linkedin.com/in/aleyna-akta%C5%9F-39b660197/'}>
              <img src={iconLinkedin} alt="" width="45" />
            </Nav.Link>
          </div>
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
        <Navbar.Brand href={`/todolist/${myDayId}`}>
            <img src={icon} alt="" width="70" />
            <Navbar.Text className="text">Planning your life</Navbar.Text>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href={`/todolist/${myDayId}`}>
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
