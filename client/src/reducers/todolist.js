import {
  ADD_TODOLIST,
  TODOLIST_ERROR
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
        todolists: [payload, ...state.todolists],
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