export interface Todo {
  todo: string;
  id: number;
  dueDate: string;
  done: boolean;
  steps: {
    id: number;
    step: string;
    done: boolean;
    todoId: number;
  }[];
};

interface Action {
  type: "SET_TODOS" | "ADD_TODO" | "UPDATE_TODO";
  payload: Todo[];
};

const todoReducer = (state = [], action : Action) => {
  switch (action.type){
    case "SET_TODOS":
      return action.payload;
    case "ADD_TODO":
      return [...state, action.payload[0]]
    case "UPDATE_TODO":
      const updatedTodo : Todo = action.payload[0];
      return state.map((todo : Todo) => {
        if (todo.id !== action.payload[0].id) {
          return todo;
        } else {
          return updatedTodo;
        };
      });
    default:
      return state;
  };
};

export default todoReducer;