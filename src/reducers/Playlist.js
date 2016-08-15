import { createAction, handleActions } from "redux-actions";
// import { ROUTER_DID_CHANGE } from "redux-router/lib/constants";

import { notificationNew } from "./Notification";
import { authLogoutActions } from "./Auth";
import {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  removePlaylist,
} from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const playlistSelect = createAction("PLAYLIST_SELECT", key => key);
export const playlistSelectCustom = createAction("PLAYLIST_SELECT_CUSTOM", tracks => tracks);
export const playlistsLoadActions = createNetworkAction("PLAYLISTS_LOAD");
export const playlistCreateActions = createNetworkAction("PLAYLIST_CREATE");
export const playlistUpdateActions = createNetworkAction("PLAYLIST_UPDATE");
export const playlistRemoveActions = createNetworkAction("PLAYLIST_REMOVE");

export const playlistsLoad = () => (dispatch, getState) => {
  dispatch(playlistsLoadActions.start());

  getPlaylists(getState().Auth.token)
    .then(playlists => dispatch(playlistsLoadActions.complete(playlists)))
    .catch(err => dispatch(notificationNew(err.message)));
};

export const playlistCreate = (name) => (dispatch, getState) => {
  dispatch(playlistCreateActions.start());

  createPlaylist(getState().Auth.token, name, [])
    .then(playlist => dispatch(playlistCreateActions.complete(playlist)))
    .catch(err => dispatch(notificationNew(err.message)));
};

export const playlistUpdate = (id, name, tracks) => (dispatch, getState) => {
  dispatch(playlistUpdateActions.start());

  updatePlaylist(getState().Auth.token, id, name, tracks)
    .then(playlist => dispatch(playlistUpdateActions.complete(playlist)))
    .catch(err => dispatch(notificationNew(err.message)));
};

export const playlistTrackAdd = (id, track) => (dispatch, getState) => {
  const playlists = getState().Playlist.playlists.slice();
  const playlist = playlists.find(list => list.id === id);
  const trackIds = playlist.tracks.concat([track]).map(t => t.id);
  dispatch(playlistUpdate(id, playlist.name, trackIds));
};

export const playlistRemove = (id) => (dispatch, getState) => {
  if (!confirm("Do you really want to remove this playlist?")) {
    return;
  }

  dispatch(playlistRemoveActions.start());

  removePlaylist(getState().Auth.token, id)
    .then(() => dispatch(playlistRemoveActions.complete(id)))
    .catch(err => dispatch(notificationNew(err.message)));
};

const initialState = {
  playlists: [],
  playlistId: -1,
  playlist: [],
  loading: false,
};

export default handleActions({
  [playlistSelect]: (state, action) => ({
    ...state,
    playlistId: action.payload,
    playlist: state.playlists.find(list => list.id === action.payload) || [],
  }),
  [playlistSelectCustom]: (state, action) => ({
    ...state,
    playlistId: -1,
    playlist: action.payload,
  }),
  [playlistsLoadActions.start]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [playlistsLoadActions.complete]: (state, action) => ({
    ...state,
    playlists: action.payload,
    loading: false,
  }),
  [playlistCreateActions.complete]: (state, action) => ({
    ...state,
    playlists: state.playlists.concat([action.payload]),
  }),
  [playlistRemoveActions.complete]: (state, action) => ({
    ...state,
    playlists: state.playlists.filter(list => list.id !== action.payload),
  }),
  [playlistUpdateActions.complete]: (state, action) => {
    const playlists = state.playlists.slice();
    const playlist = playlists.findIndex(list => list.id === action.payload.id);
    playlists[playlist] = action.payload;

    return {
      ...state,
      playlists,
    };
  },
  [authLogoutActions.complete]: (state, action) => initialState,
}, initialState);
