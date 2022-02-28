import {
  GET_PRODUCTS
} from "./actions";

const inicialState = {
  products: [],
};

export default function userReducer(state = inicialState, action) {
switch (action.type) {
  case GET_PRODUCTS:
    return {
          ...state,
          products: action.payload.products,
    };
  default:
    return {
      ...state,
    };
}
}
