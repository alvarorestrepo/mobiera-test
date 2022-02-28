import axios from "axios";

//CONSTANTES
export const GET_USER = "GET_USER";
export const SET_LOOGED = "SET_LOOGED";
export const VALIDATE_EMAIL = "VALIDATE_EMAIL";
export const UPDATE_USER = "UPDATE_USER";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const FEEDBACK = "FEEDBACK";
export const GET_PRODUCTS = "GET_PRODUCTS";

//Endpoints

const apiLoginUrl = (email) => {
  return `http://localhost:8080/users?email=${email}`;
  
};
const apiProducts = "https://fakestoreapi.com/products/";

export const getUser = ({ email }) => {
  return (dispatch) => {
    axios
      .get(apiLoginUrl(email))
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: GET_USER,
            payload: res.data[0],
          });
        } else {
          dispatch(
            getFeedback({
              textFeedback: "User or password incorrect",
              openFeedback: true,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    await axios
      .get(apiProducts)
      .then((res) => {
        dispatch({
          type: GET_PRODUCTS,
          payload: { products: res.data },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getFeedback = ({ textFeedback, openFeedback }) => {
  return (dispatch) => {
    dispatch({
      type: FEEDBACK,
      payload: {
        textFeedback,
        openFeedback,
      },
    });
  };
};

export const loggedUser = () => {
  return {
    type: SET_LOOGED,
    payload: { logged: true },
  };
};

export const getChangePassword = ({ email }) => {
  return (dispatch) => {
    axios
      .get(apiLoginUrl(email))
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: CHANGE_PASSWORD,
            payload: { changePassword: true },
          });
        } else {
          dispatch(
            getFeedback({
              textFeedback: "El usuario no existe",
              openFeedback: true,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const changePasswordFalse = () => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD,
      payload: { changePassword: false },
    });
  };
};

export const updateUser = ({ type, contend, id }) => {
  return (dispatch) => {
    
    axios
      .patch(`http://localhost:8080/users/${id}`, { [type]: contend })
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD,
      payload: { changePassword: false },
    });
    dispatch({
      type: GET_USER,
      payload: [],
    });
    dispatch({
      type: SET_LOOGED,
      payload: { logged: false },
    });
  };
};
