import axios from "axios";
// import { selectToken } from "../user/selectors";
import { apiUrl } from "../../config/constants";
import { selectToken } from "../user/selectors";

export function allLikes(data) {
  return {
    type: "likes/get",
    payload: data,
  };
}
//all likes
export const fetchAllLikes = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    try {
      const res = await axios.get(`${apiUrl}/likes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(allLikes(res.data.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

//add like
export const addLike = (tipId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    console.log(token);
    try {
      await axios.post(
        `${apiUrl}/likes/add`,
        {
          tipId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (e) {
      console.log(e.message);
    }

    dispatch(fetchAllLikes());
  };
};
//remove like
export const deleteLike = (tipId) => {
  return async (dispatch, getState) => {
    try {
      const token = selectToken(getState());
      await axios.delete(`${apiUrl}/likes/${tipId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      console.log(e.message);
    }

    dispatch(fetchAllLikes());
  };
};
