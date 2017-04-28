import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"
import { createSelector } from "reselect"

import Auth from "./Auth"
import Browse from "./Browse"
import Notification from "./Notification"
import Playlist from "./Playlist"
import Search from "./Search"
import Track from "./Track"
import User from "./User"
import Video from "./Video"

export const titleSelector = createSelector<any, any, any, any, any, any, any, any>(
  (state) => state.Video.state === "play",
  (state) => state.Video.tracks[state.Video.tracksIndex],
  (state) => (state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname) || "",
  (state) => state.Track.track,
  (state) => state.User.user,
  (state) => state.Playlist.playlist,
  (playing, playingTrack, pathname, track, user, playlist) => {
  if (playingTrack && playing) {
    return `${playingTrack.artist} - ${playingTrack.name}`
  }

  if (playlist && pathname.startsWith("/playlist")) {
    return `${playlist.name} by ${playlist.user.username}`
  }

  if (user && pathname.startsWith("/profile")) {
    return `${user.username}`
  }

  if (track && pathname.startsWith("/track")) {
    return `${track.artist} - ${track.name}`
  }

  if (pathname.startsWith("/queue")) {
    return "Queue"
  }

  if (pathname.startsWith("/login")) {
    return "Login"
  }

  if (pathname === "/") {
    return "Browse"
  }

  return "Loud"
})

export default combineReducers({
  routing: routerReducer,
  Video,
  Playlist,
  Auth,
  Notification,
  Search,
  User,
  Track,
  Browse,
})
