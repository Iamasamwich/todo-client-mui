import { Dispatch } from "redux";
import api from "../api/api";

interface LoginRes {
  status: number;
  message: string;
}

export const login = (body : {
  email: string, 
  pword: string
}) => async (dispatch : Dispatch) => {
  return await api('/login', 'POST', body)
  .then((res : LoginRes) => {
    if (res.status === 200) {
      return dispatch({type: 'LOGIN', payload: true});
    } else {
      if (res.status === 404) {
        dispatch({type: 'LOGIN', payload: false});
        return dispatch({type: 'STATUS', payload: 'login_fail'});
      };
    };
  })
  .catch(err => {
    return dispatch({type: 'LOGIN', payload: false});
  });
};