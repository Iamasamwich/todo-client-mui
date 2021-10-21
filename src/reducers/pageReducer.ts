interface Action {
  type: string;
  payload: string;
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