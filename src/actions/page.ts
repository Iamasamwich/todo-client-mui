import { Dispatch } from "redux";

export const changePage = (page: string) => async (dispatch : Dispatch) => {
  return dispatch({type: 'CHANGE_PAGE', payload: page})
};