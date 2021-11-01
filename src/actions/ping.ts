import { Dispatch } from "redux";
import api from "../api/api";
import {Ires} from '../interfaces';

export const ping = () => async (dispatch : Dispatch) => {
  return await api('/ping', 'GET')
  .then((resp : Ires) => {
    if (resp.status === 200 && resp.message === 'ok') {
      return dispatch({type: 'LOGIN', payload: true});
    } else {
      return dispatch({type: 'LOGIN', payload: false});
    };
  })
  .catch(err => {});
};