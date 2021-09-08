import axios from 'axios';
import showNotice from '../utils/showNotice';
import { setAlert } from './alert';
import {
  ADD_TODOLIST,
  TODOLIST_ERROR,
  GET_TODOLIST,
  DELETE_TODOLIST
} from './types'

// Add todo list
export const addTodoList = formList => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/todolist/', formList, config);

    dispatch({
      type: ADD_TODOLIST,
      payload: res.data
    });

    // dispatch(setAlert('Todo List added','success'))
    showNotice('😿 Todo list added', 'success')
    return res.data._id
  } catch (err) {
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Get all todo list
export const getTodoList = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/todolist/')

    dispatch({
      type: GET_TODOLIST,
      payload: res.data
    })
    
    return res.data[0]?._id
  } catch (err) {
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Delete todo list by id 
export const deleteTodoList = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/todolist/${id}`)
    
    dispatch({
      type: DELETE_TODOLIST,
      payload: id
    })
    // dispatch(setAlert('Todo List removed','success'))
    showNotice('😿 Todo list removed', 'error')
  } catch (err) {
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}


