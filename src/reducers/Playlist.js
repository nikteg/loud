import { createAction, handleActions } from "redux-actions";
// import { ROUTER_DID_CHANGE } from "redux-router/lib/constants";

import { notificationNew } from "./Notification";
import { authLogoutActions } from "./Auth";
import { getPlaylists } from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const playlistSelect = createAction("PLAYLIST_SELECT", key => key);
export const playlistsLoadActions = createNetworkAction("PLAYLISTS_LOAD");
export const playlistCreateActions = createNetworkAction("PLAYLIST_CREATE");
export const playlistRemoveActions = createNetworkAction("PLAYLIST_REMOVE");

export const playlistsLoad = () => (dispatch, getState) => {
  dispatch(playlistsLoadActions.start());

  getPlaylists(getState().Auth.token)
    .then(playlists => dispatch(playlistsLoadActions.complete(playlists)))
    .catch(err => dispatch(notificationNew(err.message)));
};

export const playlistCreate = (name) => (dispatch, getState) => {
  dispatch(playlistCreateActions.start());

  // TODO: Actually do this
  if (name.trim() === "") {
    return dispatch(playlistCreateActions.error());
  }

  const playlists = getState().Playlist.playlists;
  const lastId = playlists.length > 0 ? playlists[playlists.length - 1].id : 0;
  setTimeout(() => {
    dispatch(playlistCreateActions.complete({ name, tracks: [], id: (lastId + 1) }));
  }, 100);

  // createPlaylist(getState().Auth.token)
  //   .then(playlists => dispatch(playlistsLoaded(playlists)))
  //   .catch(err => dispatch(notificationNew(err.message)));
};

export const playlistRemove = (id) => (dispatch, getState) => {
  dispatch(playlistRemoveActions.start());

  // TODO: Actually do this
  const playlists = getState().Playlist.playlists.filter(list => list.id !== id);

  setTimeout(() => {
    dispatch(playlistRemoveActions.complete(playlists));
  }, 100);

  // createPlaylist(getState().Auth.token)
  //   .then(playlists => dispatch(playlistsLoaded(playlists)))
  //   .catch(err => dispatch(notificationNew(err.message)));
};

const initialState = {
  playlists: [],
  playlistId: 0,
  playlist: [],
  loading: false,
};

export default handleActions({
  [playlistSelect]: (state, action) => ({
    ...state,
    playlistId: action.payload,
    playlist: state.playlists.find(list => list.id === action.payload) || [],
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
    playlists: action.payload,
  }),
  [authLogoutActions.complete]: (state, action) => initialState,
}, initialState);
