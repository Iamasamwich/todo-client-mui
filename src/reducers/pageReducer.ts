interface Action {
  type: string;
  payload: "CHANGE_PAGE";
}

const pageReducer = (state = 'home', action : Action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return action.payload;
    default:
      return state;
  }
};

export default pageReducer;