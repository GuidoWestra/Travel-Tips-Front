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
//all tips for a place
export const fetchTipsForPlace = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`${apiUrl}/tips/${id}`);
      dispatch(allTipsForOnePlace(res.data.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
// add tip
export const addTip = (placeId, text) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
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
    } catch (e) {
      console.log(e.message);
    }
    showMessageWithTimeout("info", false, "Tip added!"); //doesn't work
    dispatch(fetchTipsForPlace(placeId));
  };
};
// delete tip
//nice to add: when delete tip - delete all likes for that tip
export const deleteTip = (id, placeId) => {
  return async (dispatch, getState) => {
    try {
      const token = selectToken(getState());
      await axios.delete(`${apiUrl}/tip/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      console.log(e.message);
    }
    showMessageWithTimeout("info", false, "Tip deleted!"); //doesn't work
    dispatch(fetchTipsForPlace(placeId));
  };
};
