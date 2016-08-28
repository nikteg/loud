import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Video from "./Video";
import Playlist from "./Playlist";
import Auth from "./Auth";
import Notification from "./Notification";
import Search from "./Search";
import User from "./User";
import Track from "./Track";

export default combineReducers({
  routing: routerReducer,
  Video,
  Playlist,
  Auth,
  Notification,
  Search,
  User,
  Track,
});
