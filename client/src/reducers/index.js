import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import todolist from './todolist';

export default combineReducers({
  alert,
  auth,
  todolist
}); 