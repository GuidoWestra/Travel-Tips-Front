const initialState = {
  places: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "places/fetched":
      return { ...state, ...action.payload };
    case "place/fetched":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
