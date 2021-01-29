import Axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appDoneLoading,
  appLoading,
  showMessageWithTimeout,
} from "../appState/actions";
import { selectToken } from "../user/selectors";

//set all places
const setPlaces = (places) => {
  return {
    type: "places/fetched",
    payload: places,
  };
};
//set searched place
const setPlace = (place) => {
  return {
    type: "place/fetched",
    payload: place,
  };
};
///places/list
export const fetchPlaces = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const result = await Axios.get(`${apiUrl}/places/list`);
      dispatch(setPlaces(result.data.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
//places/:id
export const fetchSinglePlace = (id) => {
  return async (dispatch, getState) => {
    // dispatch(appLoading());
    try {
      const result = await Axios.get(`${apiUrl}/places/${id}`);
      // dispatch(appDoneLoading());
      dispatch(setPlace(result.data.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
//post/places include name description city photo in the body.
// make Dynamic with token
export const postPlace = (name, description, city, photoUrl) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const token = selectToken(getState());
      if (!photoUrl) {
        photoUrl =
          "http://res.cloudinary.com/dxtq8ajzg/image/upload/v1611926197/wwqkxbcddr49uoscvlu7.jpg";
      }
      if (!token) return;
      const result = await Axios.post(
        `${apiUrl}/places`,
        {
          name,
          description,
          city,
          photo: photoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setPlace(result.data.data));
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout(
          "success",
          false,

          `${name} succes fully created`,

          1500
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
};
