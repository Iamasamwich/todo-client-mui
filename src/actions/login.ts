import { Dispatch } from "redux";
import api from "../api/api";
import {Ires, IloginBody} from '../interfaces';

export const login = (body : IloginBody) => async (dispatch : Dispatch) => {
  await api('/login', 'POST', body)
  .then((res : Ires) => {
    if (res.status === 200) {
      dispatch({type: 'LOGIN', payload: true});
    } else {
      if (res.status === 404) {
        dispatch({type: 'LOGIN', payload: false});
        dispatch({type: 'STATUS', payload: 'login_fail'});
      };
    };
  })
  .catch(err => {
    dispatch({type: 'LOGIN', payload: false});
  });
};