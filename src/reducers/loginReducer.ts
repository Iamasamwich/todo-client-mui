interface Action {
  payload: boolean;
  type: "LOGIN";
}

const loginReducer = (state = false, action : Action) => {
  switch (action.type) {
    case "LOGIN": 
      return action.payload;
    default:
      return state;
  };
};

export default loginReducer;