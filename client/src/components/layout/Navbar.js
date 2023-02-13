// import axios from 'axios';
import React, { useState, Fragment } from "react";
import { Navbar, Button, Container, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { forgotPassword, register } from "../../actions/auth";
import { login } from "../../actions/auth";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { addTodoList, getTodoList } from "../../actions/todolist";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import ForgotPassword from "../modals/ForgotPassword";
import icon from "../../img/todo-icon-2.png";
import iconProfile from "../../img/profile-icon.png";
import iconLogout from "../../img/logout-icon2.png";
import iconHome from "../../img/home-icon.png";
import { useHistory } from "react-router-dom";
import showNotice from "../../utils/showNotice";

const NavbarItem = ({
  auth: { isAuthenticated, loading },
  todolist: { todolists },
  getTodoList,
  setAlert,
  register,
  login,
  logout,
  addTodoList,
  forgotPassword,
}) => {
  let myDayId = todolists.filter((todolist) => todolist.title === "My Day")[0]
    ?._id;
  let history = useHistory();

  const [showregister, setShowRegister] = useState(false);
  const [showlogin, setShowLogin] = useState(false);
  const [formRegister, setFormRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [formLogin, setFormLogin] = useState({
    login_email: "",
    login_password: "",
  });

  const registerClose = () => setShowRegister(false);
  // const loginClose = () => setShowLogin(false);

  const registerShow = () => {
    setShowRegister(true);
    loginClose();
  };

  const loginClose = () => setShowLogin(false);
  const loginShow = () => setShowLogin(true);

  const onChangeRegister = (e) =>
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  const onChangeLogin = (e) =>
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });

  const onClickRegister = async (e) => {
    const { firstname, lastname, email, password, confirmpassword } =
      formRegister;
    if (password !== confirmpassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      await register({ firstname, lastname, email, password });
      if (firstname && lastname && email && password === confirmpassword) {
        myDayId = await addTodoList({ title: "My Day" });
        console.log(myDayId);
        await addTodoList({ title: "Important" });
        // await getTodoList();
      }
      history.push(`/todolist/${myDayId}`);
      setFormRegister({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
      registerClose();
    }
  };

  const onClickLogin = async (e) => {
    const { login_email, login_password } = formLogin;
    await login(login_email, login_password);
    setFormLogin({
      login_email: "",
      login_password: "",
    });
    myDayId = await getTodoList();
    history.push(`/todolist/${myDayId}`);
  };

  const onClickLogout = (e) => {
    e.preventDefault();
    logout();
    loginClose();
  };

  // for navbar link
  const onClickHome = async (e) => {
    e.preventDefault();
    history.push(`/todolist/${myDayId}`);
  };

  const onClickProfile = async (e) => {
    e.preventDefault();
    history.push("/profile");
  };

  //for forgot password
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [email, setEmail] = useState("");
  const forgotModalClose = () => setShowForgotModal(false);
  const forgotModalShow = () => setShowForgotModal(true);

  const onChangeForgot = (e) => setEmail(e.target.value);

  const onClickForgot = async () => {
    var status = await forgotPassword({ email });
    if (status == 404) {
      showNotice("😺 Password updated", "success");
    }
    forgotModalClose();
  };

  const guestLinks = (
    <div>
      <Navbar variant="light">
        <Container>
          <Nav.Link href="/" className="navbar-title">
            <img src={icon} alt="" width="60" />
            <Navbar.Text style={{ fontSize: "1.6rem" }} className="text">
              Planning your life
            </Navbar.Text>
          </Nav.Link>
          <Nav>
            <Nav.Link>
              <Button
                className="navbar-button"
                variant="outline"
                onClick={registerShow}
              >
                Sign Up
              </Button>
            </Nav.Link>
            <Nav.Link>
              <Button
                className="navbar-button"
                variant="outline"
                onClick={loginShow}
              >
                Login
              </Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <LoginModal
        forgotModalShow={forgotModalShow}
        onChangeLogin={onChangeLogin}
        showlogin={showlogin}
        loginClose={loginClose}
        onClickLogin={onClickLogin}
        registerShow={registerShow}
        loginData={formLogin}
      />
      <RegisterModal
        showregister={showregister}
        registerClose={registerClose}
        onChangeRegister={onChangeRegister}
        registerData={formRegister}
        onClickRegister={onClickRegister}
      />
      <ForgotPassword
        showForgotModal={showForgotModal}
        forgotModalClose={forgotModalClose}
        onChangeForgot={onChangeForgot}
        onClickForgot={onClickForgot}
      />
    </div>
  );

  const authLinks = (
    <Navbar variant="light">
      <button
        style={{ background: "transparent", border: "none" }}
        onClick={onClickHome}
      >
        <img className="todo-icon" src={icon} alt="" width="40" />
        <Navbar.Text className="text">Planning your life</Navbar.Text>
      </button>
      <Nav>
        <Nav.Link>
          <Button onClick={onClickHome} className="btn navbar-button">
            <img src={iconHome} alt="" width="22" />
          </Button>
        </Nav.Link>
        <Nav.Link>
          <Button onClick={onClickProfile} className="btn navbar-button">
            <img src={iconProfile} alt="" width="22" />
          </Button>
        </Nav.Link>
        <Nav.Link>
          <Button className="btn navbar-button" onClick={onClickLogout}>
            <img src={iconLogout} alt="" width="22" />
          </Button>
        </Nav.Link>
      </Nav>
    </Navbar>
  );

  return (
    <div>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

NavbarItem.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getTodoList: PropTypes.func.isRequired,
  addTodoList: PropTypes.func.isRequired,
  todolist: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  todolist: state.todolist,
});

export default connect(mapStateToProps, {
  setAlert,
  register,
  login,
  logout,
  getTodoList,
  addTodoList,
  forgotPassword,
})(NavbarItem);
