import axios from "axios";
// import { selectToken } from "../user/selectors";
import { apiUrl } from "../../config/constants";
import { selectToken } from "../user/selectors";
import { showMessageWithTimeout } from "../appState/actions";

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

export const addTip = (placeId, text) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    console.log(`token?`, token);
    try {
      await axios.post(
        `${apiUrl}/tips`,
        {
          placeId,
          text,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`why not?`);
      showMessageWithTimeout("info", false, "Tip added!");
      dispatch(fetchTipsForPlace(placeId));
    } catch (e) {
      console.log(e.message);
    }
  };
};
