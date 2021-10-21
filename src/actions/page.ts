import { Dispatch } from "redux";

export const changePage = (page: 'createAccount') => async (dispatch : Dispatch) => {
  return dispatch({type: 'CHANGE_PAGE', payload: page})
};