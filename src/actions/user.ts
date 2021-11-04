import { Dispatch } from "redux";
import api from "../api/api";

import { IaddUserBody, Ires, IupdatePwordBody, IupdateUserBody, IupdateUserRes } from "../interfaces";

export const createAccount = (body : IaddUserBody) => async (dispatch : Dispatch) => {
  return await api('/user', 'POST', body)
  .then((resp : Ires) => {
    if (resp.status === 201) {
      dispatch({type: "LOGIN", payload: true});
      return;
    } else {
      dispatch({type: "LOGIN", payload: false});
      dispatch({type: "STATUS", payload: resp.status});
      dispatch({type: "CHANGE_PAGE", payload: 'home'});
      return;
    };
  })
  .catch(err => {});
};

export const logout = () => (dispatch : Dispatch) => {
  dispatch({type: 'STATUS', payload: 'loading'});

  api('/login', 'PUT')
  .then(resp => {
    if (resp.status === 200) {

      
      console.log(document.cookie);

      dispatch({type: 'LOGIN', payload: false});
      dispatch({type: 'SET_TODOS', payload: []});
      dispatch({type: 'TODOS_FETCHED', payload: false});
      dispatch({type: 'STATUS', payload: null});
      dispatch({type: 'CHANGE_PAGE', payload: 'home'});
      return;
    } else {
      dispatch({type: 'LOGIN', payload: false});
      dispatch({type: 'STATUS', payload: resp.status});
      return;
    };
  });
};

export const updateUser = (body : IupdateUserBody ) => async (dispatch : Dispatch ) => {
  dispatch({type: 'STATUS', payload: 'loading'});

  return await api('/user', 'PUT', body)
  .then((resp : IupdateUserRes)  => {
    if (resp.status === 401) {
      dispatch({type: 'LOGIN', payload: false});
      dispatch({type: 'STATUS', payload: resp.status});
      return;
    } else if (resp.status === 202) {
      dispatch({type: 'STATUS', payload: null});
      dispatch({type: 'CHANGE_PAGE', payload: 'home'});
      return;
    } else {
      dispatch({type: 'STATUS', payload: resp.status});
      return;
    };
  })
};

export const updatePassword = (body : IupdatePwordBody) => (dispatch : Dispatch) => {
  return api('/user/password', 'PUT', body) 
  .then((resp : Ires) => {
    if (resp.status === 401) {
      dispatch({type: 'LOGIN', payload: false});
      dispatch({type: 'STATUS', payload: resp.status});
      dispatch({type: 'CHANGE_PAGE', payload: 'home'});
      return;
    } else if (resp.status === 202) {
      dispatch({type: 'STATUS', payload: null});
      dispatch({type: 'CHANGE_PAGE', payload: 'home'});
      return;
    } else {
      dispatch({type: 'STATUS', payload: resp.status});
      return;
    };
  });
};
