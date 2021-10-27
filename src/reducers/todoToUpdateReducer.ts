import {Itodo} from '../interfaces';

interface Action {
  type: string;
  payload: Itodo;
};

const todoToUpdateReducer = (state = null, action : Action) => {
  switch(action.type) {
    case "TODO_TO_EDIT":
      return action.payload;
    default: 
      return state;
  }

};

export default todoToUpdateReducer;