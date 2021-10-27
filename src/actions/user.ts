import { Dispatch } from "redux";
import api from "../api/api";
import { IaddUserBody, Ires } from "../interfaces";

export const createAccount = (body : IaddUserBody) => async (dispatch : Dispatch) => {
  console.log('here');
  
  return await api('/user', 'POST', body)
  .then((resp : Ires) => {
    if (resp.status === 201) {
      dispatch({type: "LOGIN", payload: true});
    } else {
      dispatch({type: "LOGIN", payload: false});
      dispatch({type: "STATUS", payload: resp.status});
      dispatch({type: "CHANGE_PAGE", payload: 'login'});
    };
  })
  .catch(err => {});
};

export const logout = () => (dispatch : Dispatch) => {
  dispatch({type: 'STATUS', payload: 'loading'});

  api('/login', 'PUT')
  .then(resp => {
    if (resp.status === 200) {
      dispatch({type: 'STATUS', payload: null});
      dispatch({type: 'LOGIN', payload: false});
      dispatch({type: 'CHANGE_PAGE', payload: 'home'});
    } else {
      dispatch({type: 'LOGIN', payload: false});
      dispatch({type: 'STATUS', payload: resp.status});
    };
  });
};
