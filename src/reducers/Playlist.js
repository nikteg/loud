import { createAction, handleActions } from "redux-actions";
// import { ROUTER_DID_CHANGE } from "redux-router/lib/constants";

export const playlistSelect = createAction("PLAYLIST_SELECT", key => key);
export const playlistsLoaded = createAction("PLAYLISTS_LOADED", playlists => playlists);
export const playlistsLoading = createAction("PLAYLISTS_LOADING");

export const playlistsLoad = () => (dispatch, getState) => {
  dispatch(playlistsLoading());

  fetch(`${API_URL}/playlists`, {
    headers: {
      "Authorization": `Bearer ${getState().Auth.token}`,
    },
  })
    .then(res => res.json())
    .then(playlists => dispatch(playlistsLoaded(playlists)));
};

export default handleActions({
  [playlistSelect]: (state, action) => ({
    ...state,
    playlistId: action.payload,
    playlist: state.playlists.find(list => list.id === action.payload) || [],
  }),
  [playlistsLoading]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [playlistsLoaded]: (state, action) => ({
    ...state,
    playlists: action.payload,
    loading: false,
  }),
}, {
  playlists: [],
  playlistId: 0,
  playlist: [],
  loading: false,
});
