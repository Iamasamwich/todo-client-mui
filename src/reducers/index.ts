import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import pageReducer from "./pageReducer";
import statusReducer from './statusReducer';
import todoReducer from './todoReducer';
import todosFetchedReducer from './todosFetchedReducer';
import showTodosReducer from './showTodosReducer';
import todoToUpdateReducer from "./todoToUpdateReducer";

export default combineReducers({
  page: pageReducer,
  login: loginReducer,
  appStatus: statusReducer,
  todos: todoReducer,
  showTodos: showTodosReducer,
  todosFetched: todosFetchedReducer,
  todoToUpdate: todoToUpdateReducer
});