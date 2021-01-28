const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "likes/get":
      return [...action.payload];
    default:
      return state;
  }
}
