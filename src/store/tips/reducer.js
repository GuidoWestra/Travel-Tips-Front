const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "tips/place":
      return [...action.payload];
    default:
      return state;
  }
};
