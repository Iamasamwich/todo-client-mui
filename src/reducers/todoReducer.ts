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
      const todosWithNewTodo : Todo[] = [...state, action.payload as Todo];
      return todosWithNewTodo.sort((a, b) => {
        return (a.done === b.done) ? 0 : a.done ? 1: -1;
      });
    case "UPDATE_TODO":
      const updatedTodo = action.payload as Todo;
      const newTodosWithUpdatedTodo = state.map((todo : Todo) => {
        if (todo.id !== updatedTodo.id) {
          return todo;
        } else {
          return action.payload;
        };
      }) as Todo[];
      return newTodosWithUpdatedTodo.sort((a, b) => {
        return (a.done === b.done) ? 0 : a.done ? 1 : -1;
      });
    case "ADD_STEP":
      const newStep = action.payload as Step;
      return state.map((todo : Todo) => {
        if (newStep.todoId === todo.id) {
          return {...todo, steps: [...todo.steps, newStep]};
        } else {
          return todo;
        };
      });
    case "UPDATE_STEP":
      const updatedStep = action.payload as Step;
      return state.map((todo : Todo) => {
        if (updatedStep.todoId === todo.id) {
          const steps = todo.steps.map(step => {
            if (step.id === updatedStep.id) {
              return updatedStep;
            } else {
              return step;
            }
          });
          return {...todo, steps};
        } else {
          return todo;
        };
      });
    default:
      return state;
  };
};

export default todoReducer;