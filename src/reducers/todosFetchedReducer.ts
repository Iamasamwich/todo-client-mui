interface Action {
  type: "TODOS_FETCHED";
  payload: boolean;
}

const todosFetchedReducer = (state = false, action : Action) => {
  switch(action.type) {
    case "TODOS_FETCHED": 
      return action.payload;
    default: 
      return state;
  }
};

export default todosFetchedReducer;