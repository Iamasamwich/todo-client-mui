export interface Step {
  id: number;
  step: string;
  done: boolean;
  todoId: number;
};

export interface Todo {
  todo: string;
  id: number;
  dueDate: string;
  done: boolean;
  steps: Step[];
};

interface Action {
  type: "SET_TODOS" | "ADD_TODO" | "UPDATE_TODO" | "ADD_STEP";
  payload: Todo[] | Todo | Step;
};

const todoReducer = (state = [], action : Action) => {
  switch (action.type){
    case "SET_TODOS":
      return action.payload;
    case "ADD_TODO":
      return [...state, action.payload as Todo]
    case "UPDATE_TODO":
      const updatedTodo = action.payload as Todo;
      return state.map((todo : Todo) => {
        if (todo.id !== updatedTodo.id) {
          return todo;
        } else {
          return action.payload;
        };
      });
    case "ADD_STEP":
      const newStep = action.payload as Step;
      return state.map((todo : Todo) => {
        if (newStep.todoId === todo.id) {
          return {...todo, steps: [...todo.steps, action.payload]}
        } else {
          return todo;
        };
      });
    default:
      return state;
  };
};

export default todoReducer;