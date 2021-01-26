const initialState = {
  places: null,
  place: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "places/fetched":
      console.log("i am action.payload", action.payload);
      return { ...state, places: action.payload };
    case "place/fetched":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
