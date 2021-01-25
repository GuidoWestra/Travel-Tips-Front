const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
