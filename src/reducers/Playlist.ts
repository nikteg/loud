import { handleActions } from "redux-actions"

import * as Api from "../lib/api"
import { createNetworkAction } from "../lib/utils"
import { Actions as NotificationActions } from "./Notification"

import { AUTH_LOGOUT } from "../actions"

export const Actions = {
  loadActions: createNetworkAction("PLAYLIST_LOAD"),
  loadAllActions: createNetworkAction("PLAYLIST_LOAD_ALL"),
  createActions: createNetworkAction("PLAYLIST_CREATE"),
  updateActions: createNetworkAction("PLAYLIST_UPDATE"),
  removeActions: createNetworkAction("PLAYLIST_REMOVE"),
  loadAll() {
    return (dispatch, getState) => {
      dispatch(Actions.loadAllActions.start())

      Api.getPlaylists(getState().Auth.token)
        .then((playlists) => dispatch(Actions.loadAllActions.complete(playlists)))
        .catch((err) => dispatch(Actions.loadAllActions.error(err.message)))
    }
  },
  load(id) {
    return (dispatch, getState) => {
      const localPlaylist = getState().Playlist.playlists.find((l) => l.id === id)

      if (localPlaylist) {
        return dispatch(Actions.loadActions.complete(localPlaylist))
      }

      dispatch(Actions.loadActions.start())

      Api.getPlaylist(getState().Auth.token, id)
        .then((playlist) => dispatch(Actions.loadActions.complete(playlist)))
        .catch((err) => dispatch(Actions.loadActions.error(err.message)))
    }
  },
  create(name, tracks = []) {
    return (dispatch, getState) => {
      dispatch(Actions.createActions.start())

      Api.createPlaylist(getState().Auth.token, name, tracks.map((t) => t.id))
        .then((playlist) => dispatch(Actions.createActions.complete(playlist)))
        .catch((err) => dispatch(Actions.createActions.error(err.message)))
    }
  },
  update(id, name, tracks) {
    return (dispatch, getState) => {
      dispatch(Actions.updateActions.start())

      Api.updatePlaylist(getState().Auth.token, id, name, tracks)
        .then((playlist) => dispatch(Actions.updateActions.complete(playlist)))
        .catch((err) => dispatch(Actions.updateActions.error(err.message)))
    }
  },
  rename(id, name) {
    return (dispatch, getState) => {
      const playlist = getState().Playlist.playlists.find((list) => list.id === id)
      const trackIds = playlist.tracks.map((t) => t.id)
      dispatch(Actions.update(id, name, trackIds))
    }
  },
  trackAdd(id, track) {
    return (dispatch, getState) => {
      const playlists = getState().Playlist.playlists.slice()
      const playlist = playlists.find((list) => list.id === id)
      const trackIds = [...playlist.tracks, track].map((t) => t.id)
      dispatch(Actions.update(id, playlist.name, trackIds))
    }
  },
  trackRemove(id, track) {
    return (dispatch, getState) => {
      const playlists = getState().Playlist.playlists.slice()
      const playlist = playlists.find((list) => list.id === id)
      const trackIds = playlist.tracks.filter((t) => t.id !== track.id).map((t) => t.id)
      dispatch(Actions.update(id, playlist.name, trackIds))
    }
  },
  remove(id) {
    return (dispatch, getState) => {
      if (!confirm("Do you really want to remove this playlist?")) {
        return
      }

      dispatch(Actions.removeActions.start())

      Api.removePlaylist(getState().Auth.token, id)
        .then(() => dispatch(Actions.removeActions.complete(id)))
        .catch((err) => dispatch(NotificationActions.show(err.message)))
    }
  },
}

const initialState = {
  playlists: [],
  playlist: null,
  allLoading: false,
  loading: false,
}

export default handleActions({
  [AUTH_LOGOUT.complete.toString()]: (state, action) => initialState,
  [Actions.loadAllActions.start.toString()]: (state, action) => ({
    ...state,
    allLoading: true,
  }),
  [Actions.loadAllActions.complete.toString()]: (state, action) => ({
    ...state,
    playlists: action.payload,
    allLoading: false,
  }),
  [Actions.loadActions.start.toString()]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [Actions.loadActions.complete.toString()]: (state, action) => ({
    ...state,
    playlist: action.payload,
    loading: false,
  }),
  [Actions.createActions.complete.toString()]: (state, action) => ({
    ...state,
    playlists: [action.payload, ...state.playlists],
  }),
  [Actions.removeActions.complete.toString()]: (state, action) => ({
    ...state,
    playlists: state.playlists.filter((list) => list.id !== action.payload),
  }),
  [Actions.updateActions.complete.toString()]: (state, action: ReduxActions.Action<{
    id,
  }>) => {
    const playlists = state.playlists.slice()
    const playlist = playlists.findIndex((list) => list.id === action.payload.id)
    playlists[playlist] = action.payload

    return {
      ...state,
      playlists,
      playlist: playlists[playlist],
    }
  },
}, initialState)
