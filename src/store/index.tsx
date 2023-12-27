import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers/index"
import { thunk } from 'redux-thunk';

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  next(action);
}

const middleware = applyMiddleware(thunk, loggerMiddleware);
const store = createStore(rootReducer, middleware);

export default store;
