interface Action {
  payload: number;
  type: string;
};

const statusReducer = (state = null, action : Action) => {
  switch (action.type) {
    case "STATUS":
      return action.payload;
    default:
      return state;
  };
};

export default statusReducer;