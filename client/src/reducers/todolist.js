import {
  ADD_TODOLIST,
  TODOLIST_ERROR,
  GET_TODOLIST,
  DELETE_TODOLIST,
  CLEAR_TODOLIST,
  CONTROL_MENU,
} from '../actions/types'

const initialState = {
  todolists: [],
  loading: true,
  error: {},
  isDropDownBtn: false
}

export default function(state = initialState, action) {
  const {type, payload } = action;

  switch (type) {

    case ADD_TODOLIST:
      return {
        ...state,
        todolists: [...state.todolists, payload ],
        loading: false
      }
    case GET_TODOLIST:
      return {
        ...state,
        todolists: payload,
        loading: false
      }
    case DELETE_TODOLIST: 
      return {
        ...state,
        todolists: state.todolists.filter(todolist => todolist._id !== payload),
        loading: false
      }
    case TODOLIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case CLEAR_TODOLIST:
      return {
        todolists: [],
        loading: true,
        error: {}
      }
    case CONTROL_MENU: 
      return {
        ...state,
        isDropDownBtn: !state.isDropDownBtn
      }
    default:
      return state;
  }
}