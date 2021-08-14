import{ ADD_TODO, GET_TODOS} from "../actions/types";

const initialState = {
  todos : [],
  loading: true,
  error : {}
}

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [ ...state.todos, payload],
        loading: false
      }
    case GET_TODOS: 
      return {
        ...state,
        todos: payload,
        loading: false
      }
    default:
      return state;
  }
} 