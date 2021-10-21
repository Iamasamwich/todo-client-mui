import { Dispatch } from "redux";
import api from "../api/api";

export const getTodos = () => async (dispatch : Dispatch) => {
  dispatch({type: "STATUS", payload: 'loading'});
  return await api('/todo', 'GET')
  .then(resp => {
    if (resp.status === 200) {
      dispatch({type: "STATUS", payload: null});
      dispatch({type: "SET_TODOS", payload: resp.todos});
      return;
    } else {
      dispatch({type: 'STATUS', payload: resp.status});
      return;
    };
  })
  .catch(err => {});
};