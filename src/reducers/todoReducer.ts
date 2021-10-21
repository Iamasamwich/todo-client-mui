export interface Todo {
  todo: string;
  id: number;
  dueDate: string;
  done: boolean;
  steps: {
    id: number;
    step: string;
    done: boolean;
  }[];
};

interface Action {
  type: "SET_TODOS";
  payload: Todo[]
};

const todoReducer = (state = [], action : Action) => {
  switch (action.type){
    case "SET_TODOS":
      return action.payload;
    default:
      return state;
  };
};

export default todoReducer;