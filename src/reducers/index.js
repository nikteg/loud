import { combineReducers } from "redux";
import { routerStateReducer as router } from "redux-router";

import Video from "./Video";
import Playlist from "./Playlist";

export default combineReducers({
  router,
  Video,
  Playlist,
});
