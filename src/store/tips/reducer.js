const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "tips/place":
      console.log(`i am an action payload`, action.payload);
      return [...state, ...action.payload];
    default:
      return state;
  }
};
