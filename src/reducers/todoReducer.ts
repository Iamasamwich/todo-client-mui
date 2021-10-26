import {Itodo, Istep, IremoveTodo, IremoveStep} from '../interfaces';

interface Action {
  type: "SET_TODOS" | "ADD_TODO" | "UPDATE_TODO" | "REMOVE_TODO" | "ADD_STEP" | "UPDATE_STEP" | "REMOVE_STEP";
  payload: Itodo[] | Itodo | Istep | IremoveTodo | IremoveStep;
};

const todoReducer = (state = [], action : Action) => {
  switch (action.type){
    case "SET_TODOS":
      const todos = action.payload as Itodo[];
      const doneLast : Itodo[] = todos.sort((a, b) => {
        return (a.done === b.done) ? 0 : a.done ? 1 : -1
      });
      return doneLast;
    case "ADD_TODO":
      const todosWithNewTodo : Itodo[] = [...state, action.payload as Itodo];
      return todosWithNewTodo.sort((a, b) => {
        return (a.done === b.done) ? 0 : a.done ? 1: -1;
      });
    case "UPDATE_TODO":
      const updatedTodo = action.payload as Itodo;
      const newTodosWithUpdatedTodo = state.map((todo : Itodo) => {
        if (todo.id !== updatedTodo.id) {
          return todo;
        } else {
          return action.payload;
        };
      }) as Itodo[];
      return newTodosWithUpdatedTodo.sort((a, b) => {
        return (a.done === b.done) ? 0 : a.done ? 1 : -1;
      });

    case "REMOVE_TODO":

      console.log(action.payload);
        

      const removeTodoStateTodos = [...state] as Itodo[]; 
      const removeTodoPayload = action.payload as IremoveTodo;
      return removeTodoStateTodos.filter(todo => {
        return todo.id !== removeTodoPayload.todoId;
      });

    case "ADD_STEP":
      const newStep = action.payload as Istep;
      return state.map((todo : Itodo) => {
        if (newStep.todoId === todo.id) {
          return {...todo, steps: [...todo.steps, newStep]};
        } else {
          return todo;
        };
      });
    case "UPDATE_STEP":
      const updatedStep = action.payload as Istep;
      return state.map((todo : Itodo) => {
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

    case "REMOVE_STEP":
      const removeStepPayload = action.payload as IremoveStep;
      const removeStepStateTodos = [...state] as Itodo[];
      return removeStepStateTodos.map(todo => {
        if (todo.id !== removeStepPayload.todoId) {
          return todo;
        } else {
          const newSteps = todo.steps.filter(step => {
            return step.id !== removeStepPayload.stepId
          });
          return {...todo, steps: newSteps};
        };
      });

    default:
      return state;
  };
};

export default todoReducer;