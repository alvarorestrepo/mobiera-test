import {
    GET_USER
} from "./actions";

const inicialState = {
    name: '',
    email: '',
    password: '',
    username: '',
    id: '',
};

export default function userReducer(state = inicialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
            ...state,
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password,
            username: action.payload.username,
            id: action.payload.id,
      };
    default:
      return {
        ...state,
      };
  }
}
