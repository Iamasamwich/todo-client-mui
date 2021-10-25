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
