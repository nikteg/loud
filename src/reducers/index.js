import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Video from "./Video";

export default combineReducers({
  routing: routerReducer,
  Video,
});
