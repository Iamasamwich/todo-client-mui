import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import pageReducer from "./pageReducer";
import statusReducer from './statusReducer';
import todoReducer from './todoReducer';

export default combineReducers({
  page: pageReducer,
  login: loginReducer,
  appStatus: statusReducer,
  todos: todoReducer
});