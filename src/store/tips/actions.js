import axios from "axios";
import { selectPlace } from "../places/selectors";
import { selectTipsForPlace } from "../tips/selectors";
import { apiUrl } from "../../config/constants";
import { selectToken } from "../user/selectors";
import { showMessageWithTimeout, setMessage } from "../appState/actions";

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
    const placeName = selectPlace(getState());

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
    dispatch(
      showMessageWithTimeout(
        "success",
        true,
        `Your new tip has been added for ${placeName.name}!`
      )
    );
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
    dispatch(showMessageWithTimeout("danger", true, `Your tip was deleted!`));
    dispatch(fetchTipsForUser());
  };
};

//user tips for account page

export const fetchTipsForUser = () => {
  return async (dispatch, getState) => {
    try {
      const token = selectToken(getState());
      const res = await axios.get(`${apiUrl}/user/tips`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(allTipsForOnePlace(res.data.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
