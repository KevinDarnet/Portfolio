// mi tienda
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//reducer
import comentarioReducer from "../Redux/actions/comentarioActions";

const rootReducer = combineReducers({
  comentarioMain: comentarioReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
