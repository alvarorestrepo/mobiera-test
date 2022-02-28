import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import userReducer from "./userReducers.js";
import loggedReducer from "./loggedReducers.js";
import feedbackReducer from "./feedbackReducers.js";
import productsReducer from "./productsReducers.js";
import thunk from "redux-thunk";
let middleware = [thunk]

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveToLocalStorage = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem('state');
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const persistedStore = loadFromLocalStorage();

const store = createStore(
    combineReducers(
        {
            user: userReducer,
            logged: loggedReducer,
            feedback: feedbackReducer,
            products: productsReducer,
        }
    ),
    persistedStore,
    composeEnhancer(applyMiddleware(...middleware))
);

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;