import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";
///places/list
export const fetchPlaces = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const result = await Axios.get(`${apiUrl}/places/list`);
    console.log("All Places ", result);
    dispatch(appDoneLoading());
    try {
    } catch (e) {
      console.log(e.message);
    }
  };
};
//places/:id
export const fetchSinglePlace = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const result = await Axios.get(`${apiUrl}/places/${id}`);
    console.log("All Places ", result);
    dispatch(appDoneLoading());
    try {
    } catch (e) {
      console.log(e.message);
    }
  };
};
