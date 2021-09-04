import axios from 'axios';
import showNotice from '../utils/showNotice';
import {
  ADD_TODO,
  TODOLIST_ERROR,
  GET_TODOS,
  DELETE_TODO,
  COMPLETE_TODO,
  EDIT_TODO
} from './types'

// Add todo
export const addTodo = formList => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/todo', formList, config);

    dispatch({
      type: ADD_TODO,
      payload: res.data
    });

    showNotice('😿 Todo added', 'success')
  } catch (err) {
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
// get all todo
export const getAllTodo = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/todo/${id}`);

    dispatch({
      type: GET_TODOS,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
//delete todo by id
export const deleteTodoById = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/todo/${id}/`);

    dispatch({
      type: DELETE_TODO,
      payload: id
    })
    
  } catch (err) {
    
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

//complete todo
export const completeTodo = completeForm => async (dispatch) => {
  const {id} = completeForm
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/todo/complete/${id}/`, completeForm, config);

    dispatch({
      type: COMPLETE_TODO,
      payload: {id, isCompleted : res.data.isCompleted} ,
    })
    console.log(res.data.isCompleted)
  } catch (err) {
    
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

//edit todo
export const editTodo = (formEdit) => async (dispatch) => {
  const {id} = formEdit
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/todo/edit/${id}/`, formEdit, config);

    dispatch({
      type: EDIT_TODO,
      payload: {id, text: res.data.text },
    })
    console.log(res.data)
  } catch (err) {
    
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}