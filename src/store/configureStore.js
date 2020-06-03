import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import throttle from "lodash.throttle";
import rootReducer from "../reducers/index";
import rootSaga from "../sagas/index"; // TODO: Next step
import { loadState, saveState } from "../localStorage/localStorage";

const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware();
// const middlewareEnhancer = applyMiddleware(sagaMiddleware);
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
  // other store enhancers if any
);
const configureStore = createStore(rootReducer, persistedState, enhancer);
sagaMiddleware.run(rootSaga);
configureStore.subscribe(
  throttle(() => {
    saveState({
      auth: configureStore.getState().auth,
      route: configureStore.getState().route,
    });
  }, 1000)
);
export default configureStore;
