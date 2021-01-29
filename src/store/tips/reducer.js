const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "tips/place":
      return [...action.payload];
    default:
      return state;
  }
}
