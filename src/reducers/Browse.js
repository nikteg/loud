import { handleActions } from "redux-actions";

import { getTracks } from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const browseActions = createNetworkAction("BROWSE");

export const browseLoad = () => (dispatch, getState) => {
  if (getState().Browse.tracks.length > 0) {
    return;
  }

  dispatch(browseActions.start());
  getTracks(getState().Auth.token)
    .then(tracks => dispatch(browseActions.complete(tracks)))
    .catch(err => dispatch(browseActions.error(err.message)));
};

export default handleActions({
  [browseActions.start]: (state, action) => ({
    ...state,
    error: null,
    loading: true,
  }),
  [browseActions.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [browseActions.complete]: (state, action) => ({
    ...state,
    tracks: action.payload,
    error: null,
    loading: false,
  }),
}, {
  loading: false,
  error: null,
  tracks: [],
});
