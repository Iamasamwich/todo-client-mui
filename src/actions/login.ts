import { Dispatch } from "redux";
import api from "../api/api";
import {Ires, IloginBody} from '../interfaces';

export const login = (body : IloginBody) => async (dispatch : Dispatch) => {
  await api('/login', 'POST', body)
  .then((res : Ires) => {
    if (res.status === 200) {
      return dispatch({type: 'LOGIN', payload: true});
    } else {
      dispatch({type: 'LOGIN', payload: false});
      dispatch({type: 'STATUS', payload: res.status});
      return;
    };
  })
  .catch(err => {
    return dispatch({type: 'LOGIN', payload: false});
  });
};