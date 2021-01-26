import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";

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
      console.log("All Places ", result.data.data);
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
    dispatch(appLoading());
    try {
      const result = await Axios.get(`${apiUrl}/places/${id}`);
      console.log("All Places ", result);
      dispatch(appDoneLoading());
      dispatch(setPlace());
    } catch (e) {
      console.log(e.message);
    }
  };
};
//post/places include name description city photo in the body.
export const postPlace = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      console.log("Am i being called?");
      const result = await Axios.post(
        `${apiUrl}/places`,
        {
          name: "Canalss",
          description: "quite wet",
          city: "Amsterdam",
          photo: "canal.canal",
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTYxMTY0OTc5NywiZXhwIjoxNjExNjU2OTk3fQ.L1AOKzcEkTZ8JrYNu_JOjx3S5wk1KuzQZPWqUtNK-KM`,
          },
        }
      );
      console.log("What am i ", result);
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e);
    }
  };
};
