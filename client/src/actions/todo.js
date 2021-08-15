import axios from 'axios';
import showNotice from '../utils/showNotice';
import {
  ADD_TODO,
  TODOLIST_ERROR,
  GET_TODOS,
  DELETE_TODO
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

    showNotice('😿 Todo added', 'warn')
  } catch (err) {
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
// get all todo
export const getAllTodo = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/todo/');

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