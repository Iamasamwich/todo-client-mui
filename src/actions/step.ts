import { Dispatch } from "redux";
import api from "../api/api";

export interface AddStepBody {
  todoId: number;
  step: string;
  done: boolean;
};

export const addStep = (body : AddStepBody) => async (dispatch : Dispatch) => {
  dispatch({type: "STATUS", payload: 'loading'});
  return await api(`/todo/${body.todoId}/step`, 'POST', body)
  .then(resp => {
    if (resp.status === 201) {
      dispatch({type: "STATUS", payload: null});
      dispatch({type: "ADD_STEP", payload: resp.step});
      return;
    } else {
      return dispatch({type: "STATUS", payload: resp.status});
    };
  });
};

export const updateStep = (stepId : number, todoId : number, body : {step: string; done: boolean}) => async (dispatch : Dispatch) => {
  dispatch({type: "STATUS", payload: 'loading'});
  return await api(`/todo/${todoId}/step/${stepId}`, 'PUT', body)
  .then(resp => {
    console.log(resp);
    
  })
  .catch(err => {});
  

}