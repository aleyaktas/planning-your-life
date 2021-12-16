import axios from 'axios';
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_TODO,
  CLEAR_TODOLIST,
} from './types';
import setAuthToken from '../utils/setAuthToken'
import {getTodoList} from "./todolist"
import {getAllTodo} from "./todo"
import showNotice from '../utils/showNotice';

// Load User

export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

//Register user
export const register = ({ firstname, lastname, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ firstname, lastname, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    await dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    await dispatch(loadUser());

  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

//Login user
export const login = ( email, password ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    await dispatch(loadUser());
    dispatch(getTodoList())
    dispatch(getAllTodo())

  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

export const logout = () => dispatch => {
  dispatch({type: LOGOUT})
  dispatch({type: CLEAR_TODO})
  dispatch({type: CLEAR_TODOLIST})
}

export const resetPassword = (password) => async () =>{

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put('/api/profile', {password}, config);
    return res.status
  }
  catch(err) {
    const errors = err.res.data.error;
    console.log(errors)
    if(errors) {
      errors.forEach(error => showNotice(`${error.msg}`, 'error'));
    }
  }
}

export const forgotPassword = (email) => async () => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/profile/forgot`, email, config);
    console.log(res)
    showNotice(`${res.data.message}`, 'success')
  }
  catch(err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => showNotice(`${error.msg}`, 'error'));
    }
  }
} 

export const setNewPassword = (password,token) => async dispatch =>{

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put(`/api/profile/forgot/${token}`, {password}, config);
    return res.status
  }
  catch(err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'success')));
    }
  }
}

