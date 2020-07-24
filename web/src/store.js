import { applyMiddleware, createStore, compose } from "redux"

import logger from "redux-logger"
import promise from 'redux-promise-middleware';
import thunk from "redux-thunk";

import rootReducer from "./modules"

// Redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// composeEnhancers part of above Redux devtools
let middleware = undefined;
if (process.env.NODE_ENV === 'production') {
    middleware = composeEnhancers(applyMiddleware(promise, thunk));
} else {
    middleware = composeEnhancers(applyMiddleware(promise, thunk, logger));
}

export default createStore(rootReducer, middleware);
