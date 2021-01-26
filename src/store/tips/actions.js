import axios from "axios";
// import { selectToken } from "../user/selectors";
import { apiUrl } from "../../config/constants";

export function allTipsForOnePlace(data) {
  return {
    type: "tips/place",
    payload: data,
  };
}

export const fetchTipsForPlace = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`${apiUrl}/tips/${id}`);
      console.log(`response`, res.data.data);
      dispatch(allTipsForOnePlace(res.data.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
