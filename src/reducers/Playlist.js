import { handleActions } from "redux-actions";

import { notificationNew } from "./Notification";
import { authLogoutActions } from "./Auth";
import {
  getPlaylists,
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  removePlaylist,
} from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const playlistsLoadActions = createNetworkAction("PLAYLISTS_LOAD");
export const playlistLoadActions = createNetworkAction("PLAYLIST_LOAD");
export const playlistCreateActions = createNetworkAction("PLAYLIST_CREATE");
export const playlistUpdateActions = createNetworkAction("PLAYLIST_UPDATE");
export const playlistRemoveActions = createNetworkAction("PLAYLIST_REMOVE");

export const playlistsLoad = () => (dispatch, getState) => {
  dispatch(playlistsLoadActions.start());

  getPlaylists(getState().Auth.token)
    .then(playlists => dispatch(playlistsLoadActions.complete(playlists)))
    .catch(err => dispatch(playlistsLoadActions.error(err.message)));
};

export const playlistLoad = (id) => (dispatch, getState) => {
  const localPlaylist = getState().Playlist.playlists.find(l => l.id === id);

  if (localPlaylist) {
    return dispatch(playlistLoadActions.complete(localPlaylist));
  }

  dispatch(playlistLoadActions.start());

  getPlaylist(getState().Auth.token, id)
    .then(playlist => dispatch(playlistLoadActions.complete(playlist)))
    .catch(err => dispatch(playlistLoadActions.error(err.message)));
};

export const playlistCreate = (name, tracks = []) => (dispatch, getState) => {
  dispatch(playlistCreateActions.start());

  createPlaylist(getState().Auth.token, name, tracks.map(t => t.id))
    .then(playlist => dispatch(playlistCreateActions.complete(playlist)))
    .catch(err => dispatch(playlistCreateActions.error(err.message)));
};

export const playlistUpdate = (id, name, tracks) => (dispatch, getState) => {
  dispatch(playlistUpdateActions.start());

  updatePlaylist(getState().Auth.token, id, name, tracks)
    .then(playlist => dispatch(playlistUpdateActions.complete(playlist)))
    .catch(err => dispatch(playlistUpdateActions.error(err.message)));
};

export const playlistRename = (id, name) => (dispatch, getState) => {
  const playlist = getState().Playlist.playlists.find(list => list.id === id);
  const trackIds = playlist.tracks.map(t => t.id);
  dispatch(playlistUpdate(id, name, trackIds));
};

export const playlistTrackAdd = (id, track) => (dispatch, getState) => {
  const playlists = getState().Playlist.playlists.slice();
  const playlist = playlists.find(list => list.id === id);
  const trackIds = [...playlist.tracks, track].map(t => t.id);
  dispatch(playlistUpdate(id, playlist.name, trackIds));
};

export const playlistTrackRemove = (id, track) => (dispatch, getState) => {
  const playlists = getState().Playlist.playlists.slice();
  const playlist = playlists.find(list => list.id === id);
  const trackIds = playlist.tracks.filter(t => t.id !== track.id).map(t => t.id);
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
  playlist: null,
  playlistsLoading: false,
  playlistLoading: false,
};

export default handleActions({
  [playlistsLoadActions.start]: (state, action) => ({
    ...state,
    playlistsLoading: true,
  }),
  [playlistsLoadActions.complete]: (state, action) => ({
    ...state,
    playlists: action.payload,
    playlistsLoading: false,
  }),
  [playlistLoadActions.start]: (state, action) => ({
    ...state,
    playlistLoading: true,
  }),
  [playlistLoadActions.complete]: (state, action) => ({
    ...state,
    playlist: action.payload,
    playlistLoading: false,
  }),
  [playlistCreateActions.complete]: (state, action) => ({
    ...state,
    playlists: [action.payload, ...state.playlists],
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
      playlist: playlists[playlist],
    };
  },
  [authLogoutActions.complete]: (state, action) => initialState,
}, initialState);
