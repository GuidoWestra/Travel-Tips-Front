const initialState = {
  places: null,
  place: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "places/fetched":
      return { ...state, places: action.payload };
    case "place/fetched":
      return { ...state, place: action.payload };
    default:
      return state;
  }
}
