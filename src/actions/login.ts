import { Dispatch } from "redux";
import api from "../api/api";

interface LoginRes {
  status: number;
  message: string;
};

interface Body {
  email : string;
  pword : string;
};

export const login = (body : Body) => async (dispatch : Dispatch) => {
  await api('/login', 'POST', body)
  .then((res : LoginRes) => {
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