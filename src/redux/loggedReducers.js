import {
    SET_LOOGED, VALIDATE_EMAIL, CHANGE_PASSWORD
} from "./actions";

const inicialState = {
    logged:false,
    validateEmail:false,
    changePassword:false,
};

export default function loggedReducer(state = inicialState, action) {
  switch (action.type) {
    case SET_LOOGED:
      return {
            ...state,
            logged: action.payload.logged,
      };
    case VALIDATE_EMAIL:
      return {
            ...state,
            validateEmail: action.payload.validateEmail,
      };
    case CHANGE_PASSWORD:
      return {
            ...state,
            changePassword: action.payload.changePassword,
      };
    default:
      return {
        ...state,
      };
  }
}
