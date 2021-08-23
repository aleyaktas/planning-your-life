import{ ADD_TODO, COMPLETE_TODO, DELETE_TODO, EDIT_TODO, GET_TODOS, CLEAR_TODO} from "../actions/types";

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
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== payload),
        loading: false
      }
    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload.id ? { ...todo, isCompleted: payload.isCompleted } : todo
        ),
        loading: false
      }
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload.id ? { ...todo, text: payload.text } : todo
        ),
        loading: false
      }
    case CLEAR_TODO:
      return {
        todos : [],
        loading: true,
        error : {}
      };
    default:
      return state;
  }
} 