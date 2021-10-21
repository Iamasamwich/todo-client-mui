interface Action {
  payload: string | number | null;
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