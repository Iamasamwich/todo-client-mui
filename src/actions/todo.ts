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

export const addTodo = (body: {todo: string, dueDate: string}) => async (dispatch : Dispatch) => {
  dispatch({type: 'STATUS', payload: 'loading'});
  const newBody = {...body, done: false};
  await api('/todo', 'POST', newBody)
  .then(resp => {
    console.log(resp);
    
    if (resp.status === 201) {
      dispatch({type: 'STATUS', payload: null});
      dispatch({type: 'ADD_TODO', payload: resp.todo});
      dispatch({type: 'CHANGE_PAGE', payload: 'todos'});
    } else {
      dispatch({type: 'STATUS', payload: resp.status});
    };
  })
  .catch(err => {});
};