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
  type: "SET_TODOS" | "ADD_TODO";
  payload: Todo[] | Todo;
};

const todoReducer = (state = [], action : Action) => {

  console.log(state);
  

  switch (action.type){
    case "SET_TODOS":
      return action.payload;
    case "ADD_TODO":
      return [...state, action.payload]
    default:
      return state;
  };
};

export default todoReducer;