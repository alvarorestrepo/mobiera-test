import {
  FEEDBACK
} from "./actions";

const inicialState = {
  textFeedback: '',
  openFeedback: false,
};

export default function feedbackReducer(state = inicialState, action) {
switch (action.type) {
  case FEEDBACK:
    return {
          ...state,
          textFeedback: action.payload.textFeedback,
          openFeedback: action.payload.openFeedback,
    };
  default:
    return {
      ...state,
    };
}
}
