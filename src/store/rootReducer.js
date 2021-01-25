import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import tips from "./tips/reducer";
import places from "./places/reducer";
import likes from "./likes/reducer";

export default combineReducers({
  appState,
  user,
  tips,
  places,
  likes,
});
