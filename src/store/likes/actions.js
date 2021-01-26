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

      console.log(`what is that?`, res.data.data);
      dispatch(allLikes(res.data.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
