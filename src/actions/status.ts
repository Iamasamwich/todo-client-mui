import { Dispatch } from "redux";

export const setStatus = (status : string | number | null) => (dispatch : Dispatch) => {
  return dispatch({type: "STATUS", payload: status});
};

