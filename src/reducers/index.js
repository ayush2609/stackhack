import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import taskReducer from "./taskReducer";
import auth from "./rootReducer";
// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  taskReducer,
  auth,
});

export default rootReducer;
