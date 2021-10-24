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
  type: "SET_TODOS" | "ADD_TODO" | "UPDATE_TODO" | "ADD_STEP" | "UPDATE_STEP";
  payload: Todo[] | Todo | Step;
};

const todoReducer = (state = [], action : Action) => {
  switch (action.type){
    case "SET_TODOS":
      const todos = action.payload as Todo[];
      const doneLast : Todo[] = todos.sort((a, b) => {
        return (a.done === b.done) ? 0 : a.done ? 1 : -1
      });
      return doneLast;
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
    case "UPDATE_STEP":
      console.log(state);
      
      const updatedStep = action.payload as Step;
      return state.map((todo : Todo) => {
        if (updatedStep.todoId !== todo.id) {
          return todo;
        } else {
          const steps = todo.steps.filter(step => {
            return step.id !== updatedStep.id;
          });
          return  {...todo, steps: [...steps, updatedStep]}
        };
      });
    default:
      return state;
  };
};

export default todoReducer;