import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_TODOLIST,
  TODOLIST_ERROR
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
