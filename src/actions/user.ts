import { Dispatch } from "redux";
import api from "../api/api";

interface CreateAccountBody {
  name: string;
  email: string;
  pword: string;
};

interface Resp {
  status: number;
  message: number;
};

export const createAccount = (body : CreateAccountBody) => async (dispatch : Dispatch) => {
  console.log('here');
  
  return await api('/user', 'POST', body)
  .then((resp : Resp) => {
    console.log(resp);
    return resp;
  })
  .then(resp => {
    if (resp.status === 201) {
      dispatch({type: "LOGIN", payload: true});
    } else {
      dispatch({type: "LOGIN", payload: false});
      dispatch({type: "STATUS", payload: resp.status});
      dispatch({type: "CHANGE_PAGE", payload: 'login'});
    };
  });
};
