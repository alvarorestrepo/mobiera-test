import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import userReducer from "./userReducers.js";
import loggedReducer from "./loggedReducers.js";
import thunk from "redux-thunk";
let middleware = [thunk]

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers(
        {
            user: userReducer,
            logged: loggedReducer
        }
    ),
    composeEnhancer(applyMiddleware(...middleware))
);

export default store;