import { Dispatch } from "redux";
import api from "../api/api";
import { IaddStepBody, IupdateStepBody, IstepRes } from "../interfaces";


export const addStep = (body : IaddStepBody) => async (dispatch : Dispatch) => {
  dispatch({type: "STATUS", payload: 'loading'});
  return await api(`/todo/${body.todoId}/step`, 'POST', body)
  .then((resp : IstepRes) => {
    if (resp.status === 201) {
      dispatch({type: "STATUS", payload: null});
      dispatch({type: "ADD_STEP", payload: resp.step});
      return;
    } else {
      return dispatch({type: "STATUS", payload: resp.status});
    };
  });
};

export const updateStep = (details: IupdateStepBody) => async (dispatch : Dispatch) => {
  dispatch({type: "STATUS", payload: 'loading'});
  return await api(`/todo/${details.todoId}/step/${details.stepId}`, 'PUT', details.body)
  .then((resp : IstepRes) => {
    if (resp.status === 202) {
      dispatch({type: "STATUS", payload: null});
      dispatch({type: "UPDATE_STEP", payload: resp.step});
    } else {
      dispatch({type: "STATUS", payload: resp.status});
    };
  })
  .catch(err => {});
};

export const deleteStep = (stepId: number, todoId: number) => async (dispatch : Dispatch) => {
  dispatch({type: "STATUS", payload: 'loading'});
  return await api(`/todo/${todoId}/step/${stepId}`, 'DELETE')
  .then(resp => {
    if (resp.status === 202) {
      dispatch({type: "STATUS", payload: null});
      dispatch({type: "REMOVE_STEP", payload: {stepId, todoId}});
      return;
    } else {
      dispatch({type: "STATUS", payload: resp.status});
      return;
    };
  });
};