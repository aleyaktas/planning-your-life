import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_TODOLIST,
  TODOLIST_ERROR,
  GET_TODOLIST
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

    dispatch(setAlert('Todo List added','success'))
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
  } catch (err) {
    dispatch({
      type: TODOLIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
