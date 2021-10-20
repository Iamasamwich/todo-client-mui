import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import statusReducer from './statusReducer';

export default combineReducers({
  login: loginReducer,
  appStatus: statusReducer
});