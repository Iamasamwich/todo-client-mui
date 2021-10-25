interface Action {
  type: "SHOW_TODOS";
  payload: 'active' | 'all';
}

const showTodosReducer = (state = 'active', action : Action) => {
  switch (action.type) {
    case "SHOW_TODOS":
      return action.payload;
    default: 
      return state;
  };
};

export default showTodosReducer;