import { Dispatch } from "redux";

export const setStatus = (status : string | number | null) => (dispatch : Dispatch) => {
  dispatch({type: "STATUS", payload: null});
};
