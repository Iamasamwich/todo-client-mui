import { Dispatch } from "redux";

export const changePage = (page: string) => async (dispatch : Dispatch) => {
  dispatch({type: 'TODO_TO_EDIT', payload: null});
  dispatch({type: 'CHANGE_PAGE', payload: page})
  return;
};