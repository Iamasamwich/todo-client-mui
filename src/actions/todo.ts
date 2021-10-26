import { Dispatch } from "redux";
import api from "../api/api";
import { IaddTodoBody, Ires, Itodo, ItodoRes, ItodosRes } from "../interfaces";

export const getTodos = () => async (dispatch : any, getState : any) => {
  const path = getState().showTodos === 'active' ? '/todo' : '/todo/all';
  dispatch({type: "STATUS", payload: 'loading'});
  return await api(path, 'GET')
  .then((resp : ItodosRes) => {
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

export const addTodo = (body: IaddTodoBody) => async (dispatch : Dispatch) => {
  dispatch({type: 'STATUS', payload: 'loading'});
  const newBody = {...body, done: false};
  
  await api('/todo', 'POST', newBody)
  .then((resp : ItodoRes) => {
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

export const updateTodo = (todo : Itodo) => async (dispatch : Dispatch) => {
  const body = {
    todo: todo.todo,
    done: todo.done,
    dueDate: todo.dueDate,
  };
  dispatch({type: "STATUS", payload: 'loading'});
  return await api(`/todo/${todo.id}`, 'PUT', body)
  .then((resp : ItodoRes) => {
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

export const deleteTodo = (todoId : number) => async (dispatch : Dispatch) => {
  console.log('deleting todo #', todoId);
  
  dispatch({type: 'STATUS', payload: 'loading'});
  await api(`/todo/${todoId}`, "DELETE")
  .then((resp : Ires) => {
    console.log(resp);
    if (resp.status === 202) {
      dispatch({type: 'STATUS', payload: null});
      dispatch({type: 'REMOVE_TODO', payload: {todoId}});
      return;
    } else {
      dispatch({type: 'STATUS', payload: resp.status});
      return;
    };
  })
  .catch(err => {});
};

export const changeShowTodos = (str : 'active' | 'all') => (dispatch : Dispatch) => {
  dispatch({type: 'SHOW_TODOS', payload: str});
  return;
};
