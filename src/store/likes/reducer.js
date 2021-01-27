const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "likes/get":
      return [...action.payload];
    default:
      return state;
  }
};
