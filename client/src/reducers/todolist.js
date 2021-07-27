import {
  ADD_TODOLIST,
  TODOLIST_ERROR,
  GET_TODOLIST
} from '../actions/types'

const initialState = {
  todolists: [],
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const {type, payload } = action;

  switch (type) {

    case ADD_TODOLIST:
      return {
        ...state,
        todolists: [...state.todolists,payload ],
        loading: false
      }
    case GET_TODOLIST:
      return {
        ...state,
        todolists: payload,
        loading: false
      }
  
    case TODOLIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}