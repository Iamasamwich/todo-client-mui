import { Dispatch } from "redux";
import api from "../api/api";
import { Todo } from "../reducers/todoReducer";

export const getTodos = () => async (dispatch : any, getState : any) => {
  const path = getState().showTodos === 'active' ? '/todo' : '/todo/all';
  dispatch({type: "STATUS", payload: 'loading'});
  return await api(path, 'GET')
  .then(resp => {
    if (resp.status === 200) {
      dispatch({type: "TODOS_FETCHED", payload: true});
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
  console.log(newBody);
  
  await api('/todo', 'POST', newBody)
  .then(resp => {
    if (resp.status === 201) {
      dispatch({type: 'STATUS', payload: null});
      dispatch({type: 'ADD_TODO', payload: resp.todo});
      dispatch({type: 'CHANGE_PAGE', payload: 'todos'});
    } else {
      dispatch({type: 'STATUS', payload: [resp.status]});
    };
  })
  .catch(err => {});
};

export const updateTodo = (todo : Todo) => async (dispatch : Dispatch) => {
  const body = {
    todo: todo.todo,
    done: todo.done,
    dueDate: todo.dueDate,
  };
  dispatch({type: "STATUS", payload: 'loading'});
  return await api(`/todo/${todo.id}`, 'PUT', body)
  .then(resp => {
    if (resp.status === 202) {
      dispatch({type: 'STATUS', payload: null})
      dispatch({type: "UPDATE_TODO", payload: resp.todo});
      return;
    } else {
      dispatch({type: 'STATUS', payload: resp.status});
    };
  })
  .catch(err => {});
};

export const changeShowTodos = (str : 'active' | 'all') => (dispatch : Dispatch) => {
  dispatch({type: 'SHOW_TODOS', payload: str});
  return;
};
