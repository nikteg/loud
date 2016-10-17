import { handleActions } from "redux-actions";

import { getTrack } from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const trackActions = createNetworkAction("TRACK");

export const trackLoad = (query) => (dispatch, getState) => {
  dispatch(trackActions.start(query));
  getTrack(getState().Auth.token, query)
    .then(track => dispatch(trackActions.complete(track)))
    .catch(err => dispatch(trackActions.error(err.message)));
};

export default handleActions({
  [trackActions.start]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [trackActions.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [trackActions.complete]: (state, action) => ({
    ...state,
    track: action.payload,
    error: null,
    loading: false,
  }),
}, {
  track: null,
  loading: false,
  error: null,
});
